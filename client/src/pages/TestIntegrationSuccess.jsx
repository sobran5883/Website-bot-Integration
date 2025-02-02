import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Facebook, Twitter, Linkedin } from "lucide-react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

const SuccessScreen = () => {
  const navigate = useNavigate()
  const [isSharing, setIsSharing] = useState(false)
  const { width, height } = useWindowSize()

  const handleExploreAdminPanel = () => {
    navigate("")
  }

  const handleStartChatbot = () => {
    navigate("")
  }

  const handleShare = (platform) => {
    setIsSharing(true)
    setTimeout(() => {
      setIsSharing(false)
      alert(`Shared successfully on ${platform}!`) // Using alert instead of toast for simplicity
    }, 1000)
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-2xl min-h-screen relative">
      <Confetti width={width} height={height} />
      <h1 className="text-3xl font-bold text-center">Integration Successful!</h1>
      <p className="mt-4 text-center text-gray-600">
        Your integration has been completed successfully.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleExploreAdminPanel}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
        >
          Explore Admin Panel
        </button>
        <button
          onClick={handleStartChatbot}
          className="px-4 py-2 border border-primary text-primary rounded hover:bg-blue-50 transition-colors"
        >
          Start talking to your chatbot
        </button>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-center">Share on Social Media:</h2>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => handleShare("Facebook")}
            className="p-2 border rounded hover:bg-gray-100 transition-colors"
            disabled={isSharing}
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Share on Facebook</span>
          </button>
          <button
            onClick={() => handleShare("Twitter")}
            className="p-2 border rounded hover:bg-gray-100 transition-colors"
            disabled={isSharing}
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Share on Twitter</span>
          </button>
          <button
            onClick={() => handleShare("LinkedIn")}
            className="p-2 border rounded hover:bg-gray-100 transition-colors"
            disabled={isSharing}
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">Share on LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessScreen
