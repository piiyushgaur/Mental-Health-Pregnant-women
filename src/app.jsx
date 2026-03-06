import React, { useState } from 'react';
import { Send, User, MessageCircle, ChevronDown } from 'lucide-react';

const PERSONAS = [
  {
    id: 1,
    name: "Maya Patel",
    age: 32,
    trimester: "Third (28 weeks)",
    occupation: "Software Engineer",
    background: "High-stress tech job, married with no prior kids. Tech-savvy. Anxious about labor.",
    personality: "Perfectionist, analytical, values efficiency",
    painPoints: ["Sleep disruption", "Work stress bleeding into pregnancy", "Fear of losing control during labor", "Performance anxiety"],
    wellness: "Tried yoga twice, meditation apps downloaded but never used",
    availability: "Morning and late evening only",
    techComfort: "Very high",
    priorities: "Evidence-based, time-efficient, not woo-woo"
  },
  {
    id: 2,
    name: "Jessica Torres",
    age: 27,
    trimester: "First (12 weeks)",
    occupation: "HR Manager",
    background: "Second child, first pregnancy with new partner. Practical. Social.",
    personality: "Community-oriented, warm, pragmatic",
    painPoints: ["Nausea and fatigue", "Managing older child", "Relationship anxiety", "Overwhelm"],
    wellness: "Regular gym-goer, tried Calm app, likes group fitness classes",
    availability: "Flexible, mornings preferred",
    techComfort: "Medium",
    priorities: "Social support, quick sessions, relatable content"
  },
  {
    id: 3,
    name: "Sophie Chen",
    age: 35,
    trimester: "Second (20 weeks)",
    occupation: "Freelance Graphic Designer",
    background: "Tried for 3 years to get pregnant. Very intentional. Perfectionist.",
    personality: "Introspective, mindful, spiritual-leaning",
    painPoints: ["Hypervigilance about fetal health", "Previous miscarriage trauma", "Perfectionism", "Isolation"],
    wellness: "Regular meditation practitioner, yoga studio member, reads about pregnancy constantly",
    availability: "Variable schedule but protects mornings",
    techComfort: "Medium-high",
    priorities: "Deep emotional support, community, evidence-backed but holistic"
  },
  {
    id: 4,
    name: "Aisha Johnson",
    age: 29,
    trimester: "Third (35 weeks)",
    occupation: "Nurse (12-hour shifts)",
    background: "Single mother, strong support system. Resilient.",
    personality: "Practical, no-nonsense, compassionate",
    painPoints: ["Physical exhaustion", "Financial stress", "Childcare logistics", "Pressure to 'handle it all'"],
    wellness: "Walks, minimal screen time, values real-world support",
    availability: "Very limited, unpredictable",
    techComfort: "Low-medium",
    priorities: "Offline options, no judgment, practical coping tools"
  },
  {
    id: 5,
    name: "Emma Watson",
    age: 31,
    trimester: "First (8 weeks)",
    occupation: "Marketing Director",
    background: "Career-focused, planning maternity leave carefully. Strategist.",
    personality: "Ambitious, data-driven, results-oriented",
    painPoints: ["Anxiety about career interruption", "Imposter syndrome expanding to motherhood", "Work-life boundary collapse", "Control fears"],
    wellness: "Peloton user, tried Headspace, reads parenting books like business strategy",
    availability: "Morning workouts, some evenings",
    techComfort: "Very high",
    priorities: "Data, progress tracking, scientifically-backed, professional tone"
  },
  {
    id: 6,
    name: "Leah Rodriguez",
    age: 24,
    trimester: "Second (19 weeks)",
    occupation: "Graduate Student (Biology)",
    background: "Young, still in school. Unplanned pregnancy. Resilient but stressed.",
    personality: "Curious, academic, self-directed learner",
    painPoints: ["Academic pressure + pregnancy", "Body image shifts", "Peer comparisons", "Uncertainty about future"],
    wellness: "Stress walks, tried meditation once, YouTube wellness videos",
    availability: "Inconsistent, between classes and research",
    techComfort: "Very high",
    priorities: "Free or low-cost, scientifically explained, non-judgmental"
  },
  {
    id: 7,
    name: "Patricia Hammond",
    age: 38,
    trimester: "Third (33 weeks)",
    occupation: "College Professor (English)",
    background: "Advanced maternal age, sophisticated, well-read. Third pregnancy.",
    personality: "Intellectual, reflective, experienced",
    painPoints: ["Age-related anxiety", "Pressure to 'do pregnancy right' this time", "Aging body concerns", "Time poverty"],
    wellness: "Long-time meditation practitioner, journaling, literary approach to motherhood",
    availability: "Late evening and weekend mornings",
    techComfort: "Medium",
    priorities: "Literary/philosophical depth, personalization, community of mothers 35+"
  },
  {
    id: 8,
    name: "Raminder Kaur",
    age: 26,
    trimester: "First (10 weeks)",
    occupation: "Small Business Owner (Clothing Boutique)",
    background: "Entrepreneur, running own business. High pressure. Cultural expectations.",
    personality: "Driven, family-oriented, spiritually connected",
    painPoints: ["Business can't run without her", "Family pressure about 'doing it all'", "Guilt about slowing down", "Cultural conflict about pregnancy visibility"],
    wellness: "Yoga background, daily prayers, limited app experience",
    availability: "Very limited, pockets of time",
    techComfort: "Low",
    priorities: "Family values, spiritual but secular options, short & efficient"
  },
  {
    id: 9,
    name: "Claire Mitchell",
    age: 30,
    trimester: "Second (22 weeks)",
    occupation: "Financial Analyst",
    background: "Organized, planning-oriented, health-conscious. Married to tech executive.",
    personality: "Detail-oriented, organized, slightly controlling",
    painPoints: ["Needing to plan/control pregnancy", "Comparison to friends' pregnancies", "Pressure from partner's tech world", "Overwhelm from information"],
    wellness: "Consistent runner, Oura ring user, tracks everything, downloaded 5 meditation apps",
    availability: "Morning routine (5:30am), lunch breaks",
    techComfort: "Very high",
    priorities: "Integration with health apps, personalization, tracking, quality over quantity"
  },
  {
    id: 10,
    name: "Vanessa Williams",
    age: 33,
    trimester: "Third (30 weeks)",
    occupation: "Public Relations Manager",
    background: "Extroverted, social, corporate world. First pregnancy after fertility treatment.",
    personality: "Charismatic, social, people-focused, slightly anxious",
    painPoints: ["Fertility journey trauma resurging", "Loss of pre-pregnancy identity", "Social anxiety about physical changes", "Needing 'safe space' to be vulnerable"],
    wellness: "Group fitness enthusiast, tried therapy, new to wellness apps",
    availability: "Weekday mornings, some evenings",
    techComfort: "High",
    priorities: "Community feel, authentic stories, space for vulnerability, not preachy"
  }
];

export default function UserResearchTool() {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateResponse = async () => {
    if (!question.trim()) return;

    const userMessage = { role: 'user', content: question, persona: selectedPersona.name };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const prompt = `You are ${selectedPersona.name}, a ${selectedPersona.age}-year-old pregnant woman in your ${selectedPersona.trimester}.

YOUR PROFILE:
- Occupation: ${selectedPersona.occupation}
- Background: ${selectedPersona.background}
- Personality: ${selectedPersona.personality}
- Pain Points: ${selectedPersona.painPoints.join(', ')}
- Wellness Background: ${selectedPersona.wellness}
- Limited Availability: ${selectedPersona.availability}
- Tech Comfort Level: ${selectedPersona.techComfort}
- Top Priorities: ${selectedPersona.priorities}

You are being interviewed about a meditation/mindfulness app specifically designed for pregnant women.

Respond authentically as this person would. Be specific, honest, and reflective. Your response should be 2-3 sentences, capturing how YOU specifically would feel or react based on your unique situation, stress points, and background. Don't be generic - be YOU. Include real concerns, real doubts, real excitement if relevant.

The question being asked: "${question}"`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text,
        persona: selectedPersona.name
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        persona: selectedPersona.name
      }]);
    }

    setLoading(false);
  };

  const handlePersonaChange = (persona) => {
    setSelectedPersona(persona);
    setMessages([]);
    setQuestion('');
  };

  const resetConversation = () => {
    setMessages([]);
    setQuestion('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Pregnant User Research Tool
          </h1>
          <p className="text-gray-600 text-lg">Interview 10 synthetic user personas about your meditation app</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Persona Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-rose-600" />
                Select User
              </h2>
              
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {PERSONAS.map((persona) => (
                  <button
                    key={persona.id}
                    onClick={() => handlePersonaChange(persona)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedPersona.id === persona.id
                        ? 'bg-gradient-to-r from-rose-100 to-purple-100 border border-rose-300'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{persona.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{persona.age}y • {persona.trimester}</div>
                    <div className="text-xs text-gray-500">{persona.occupation}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Persona Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedPersona.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">Age</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPersona.age}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">Trimester</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPersona.trimester}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">Occupation</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPersona.occupation}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">Tech Comfort</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPersona.techComfort}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500 uppercase tracking-wide block mb-1">Main Concerns</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPersona.painPoints.map((point, idx) => (
                      <span key={idx} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 flex flex-col h-[500px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-rose-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <MessageCircle size={48} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Ask {selectedPersona.name} a question about the meditation app</p>
                      <p className="text-sm text-gray-400 mt-2">Try: "What's your biggest concern about pregnancy?" or "Would you use a meditation app? Why or why not?"</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && generateResponse()}
                    placeholder="Ask a question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    disabled={loading}
                  />
                  <button
                    onClick={generateResponse}
                    disabled={loading || !question.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-lg hover:from-rose-600 hover:to-purple-600 disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            {messages.length > 0 && (
              <button
                onClick={resetConversation}
                className="w-full py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Start New Conversation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
