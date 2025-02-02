import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "react-router-dom"

const ChatbotIntegration = () => {
  const [showChatbot, setShowChatbot] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Chatbot Integration & Testing</h2>
        <div className="space-y-4">
          <button
            className="w-full py-2 px-4 bg-red-300 text-white rounded hover:bg-primary transition duration-200"
            onClick={() => setShowChatbot(true)}
          >
            Test Chatbot
          </button>
          <button
            className="w-full py-2 px-4 bg-red-300 text-white rounded hover:bg-dark transition duration-200"
            onClick={() => setShowInstructions(true)}
          >
            Integrate on Your Website
          </button>
          <NavLink to='/integration-success'>
          <button  className="w-full mt-4 py-2 px-4 bg-red-300 text-white rounded hover:bg-dark2 transition duration-200">
            Test Integration
          </button>
          </NavLink>
          <NavLink to='http://myfastx.com'>
          <button  className="w-full mt-4 py-2 px-4 bg-red-300 text-white rounded hover:bg-dark2 transition duration-200">
            Test Integration
          </button>
          </NavLink>
        </div>
      </div>
      
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-5 right-5 bg-white p-4 shadow-xl rounded-lg w-80"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Chatbot</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowChatbot(false)}>
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <p className="text-sm text-blue-800">Chatbot not working as intended? <span className="font-semibold">Share feedback</span></p>
              </div>
              <input type="text" placeholder="Type your message..." className="w-full p-2 border rounded" />
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Send
              </button>
            </div>
          </motion.div>
        )}

        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h3 className="text-xl font-semibold mb-3">Integration Instructions</h3>
              <p className="mb-2">
                Copy & paste the following code inside your websites <code>&lt;head&gt;</code> tag:
              </p>
              <pre className="bg-gray-100 p-2 rounded text-sm mb-4 overflow-x-auto">
                <code>{`<script src="https://example.com/chatbot.js"></script>`}</code>
              </pre>
              <div className="space-y-2">
                <button
                  className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-secondary transition duration-200"
                  onClick={() => {
                    alert("Instructions sent to developer!")
                    setShowInstructions(false)
                  }}
                >
                  Email Instructions to Developer
                </button>
                <button
                  className="w-full py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                  onClick={() => setShowInstructions(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

export default ChatbotIntegration
