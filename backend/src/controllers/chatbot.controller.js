const OpenAI = require('openai');
const User = require('../models/user.model');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @desc    Send message to chatbot
// @route   POST /api/chatbot/message
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // Get user context
    const user = await User.findById(userId);
    const userContext = {
      skills: user.skills,
      interests: user.interests,
      education: user.education,
      experience: user.experience
    };

    // Create system message with context
    const systemMessage = `You are a career guidance AI assistant. The user has the following background:
    Skills: ${userContext.skills.join(', ')}
    Interests: ${userContext.interests.join(', ')}
    Education: ${userContext.education.map(e => `${e.degree} in ${e.field} from ${e.institution}`).join(', ')}
    Experience: ${userContext.experience.map(e => `${e.position} at ${e.company}`).join(', ')}
    
    Provide personalized career advice based on this context.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
    });

    const response = completion.choices[0].message.content;

    // Save conversation to user's history (you'll need to implement this)
    // await saveConversation(userId, message, response);

    res.status(200).json({
      success: true,
      data: {
        message: response
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get conversation history
// @route   GET /api/chatbot/history
// @access  Private
exports.getConversationHistory = async (req, res, next) => {
  try {
    // Implement conversation history retrieval
    res.status(200).json({
      success: true,
      data: []
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get career suggestions
// @route   GET /api/chatbot/career-suggestions
// @access  Private
exports.getCareerSuggestions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const prompt = `Based on the following user profile, suggest 5 suitable career paths:
    Skills: ${user.skills.join(', ')}
    Interests: ${user.interests.join(', ')}
    Education: ${user.education.map(e => `${e.degree} in ${e.field}`).join(', ')}
    Experience: ${user.experience.map(e => `${e.position} at ${e.company}`).join(', ')}
    
    For each career path, provide:
    1. Job title
    2. Required skills
    3. Growth potential
    4. Estimated salary range
    5. Recommended next steps`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a career counselor AI." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });

    const suggestions = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        suggestions
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get skill assessment
// @route   POST /api/chatbot/skill-assessment
// @access  Private
exports.getSkillAssessment = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    const prompt = `Based on the user's profile and assessment answers, provide a detailed skill assessment:
    
    User Profile:
    Skills: ${user.skills.join(', ')}
    Interests: ${user.interests.join(', ')}
    Education: ${user.education.map(e => `${e.degree} in ${e.field}`).join(', ')}
    
    Assessment Answers:
    ${JSON.stringify(answers, null, 2)}
    
    Please provide:
    1. Strengths analysis
    2. Areas for improvement
    3. Recommended skill development path
    4. Specific course recommendations
    5. Career trajectory based on skill set`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a skill assessment AI." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });

    const assessment = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        assessment
      }
    });
  } catch (err) {
    next(err);
  }
}; 