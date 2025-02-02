import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe2, Building2, FileText, X, ChevronRight, AlertCircle, CheckCircle2, MessageSquare, Loader2, Link } from 'lucide-react'
import { NavLink } from "react-router-dom"
function Get() {
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    companyDescription: "",
  })


  const [metaDescription, setMetaDescription] = useState("")
  const [webPages, setWebPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fetchCompleted, setFetchCompleted] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const simulateLoading = async (fetchFunction) => {
    setLoading(true)
    setProgress(0)
    setErrorMessage("")

    for (let i = 10; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress(i)
    }

    await fetchFunction()
    setLoading(false)
  }

  // Mock API response since we don't have a real backend
  const mockFetchMetaDescription = async (url) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock responses for different URLs
    const mockData = {
      'github.com': 'GitHub is where over 100 million developers shape the future of software.',
      'stackoverflow.com': 'Stack Overflow is the largest, most trusted online community for developers.',
      'example.com': 'This is an example website used for demonstration purposes.'
    }

    // Extract domain from URL
    const domain = url.replace(/^https?:\/\//, '').split('/')[0]
    
    if (mockData[domain]) {
      return mockData[domain]
    }
    
    return "A professional website providing valuable services and information."
  }

  const fetchMetaDescription = async () => {
    if (!formData.websiteUrl) {
      setErrorMessage("Website URL is required")
      return
    }

    // Validate URL format
    try {
      new URL(formData.websiteUrl.startsWith('http') ? formData.websiteUrl : `https://${formData.websiteUrl}`)
    } catch {
      setErrorMessage("Please enter a valid URL")
      return
    }

    await simulateLoading(async () => {
      try {
        // Use mock API instead of real fetch
        const description = await mockFetchMetaDescription(formData.websiteUrl)
        setMetaDescription(description)
        setFormData(prev => ({ ...prev, companyDescription: description }))
        setFetchCompleted(true)
      } catch (error) {
        setErrorMessage("Failed to fetch description. Please try again.")
      }
    })
  }

  const fetchWebPages = () => {
    const domain = formData.websiteUrl.replace(/^https?:\/\//, '').split('/')[0]
    setWebPages([
      { url: `https://${domain}/about`, status: "Scraped", chunks: ["About Us", "Our Mission"] },
      { url: `https://${domain}/blog`, status: "Pending", chunks: [] },
      { url: `https://${domain}/contact`, status: "Scraped", chunks: ["Contact Info", "Location"] },
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Organization Setup</h1>
          <p className="text-gray-600">Configure your organization details and fetch website information</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Building2 className="w-4 h-4 mr-2" />
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Globe2 className="w-4 h-4 mr-2" />
                  Website URL
                </label>
                <input
                  type="text"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Company Description
                </label>
                <textarea
                  name="companyDescription"
                  value={metaDescription || formData.companyDescription}
                  onChange={handleChange}
                  placeholder="Enter company description or fetch from website"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <div className="space-y-4">
                <button
                  onClick={fetchMetaDescription}
                  disabled={loading}
                  className="relative w-full bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 overflow-hidden"
                >
                  <span
                    className="absolute inset-0 bg-secondary transition-all duration-200"
                    style={{ width: `${progress}%`, opacity: loading ? 1 : 0 }}
                  />
                  <span className="relative flex items-center justify-center">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Fetching {progress}%
                      </>
                    ) : (
                      <>
                        <Link className="w-5 h-5 mr-2" />
                        Fetch Description
                      </>
                    )}
                  </span>
                </button>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-4 rounded-lg bg-red-50 text-red-600"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errorMessage}
                  </motion.div>
                )}

                {fetchCompleted && !errorMessage && (
                  <motion.button
                    onClick={fetchWebPages}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Analyze Web Pages
                  </motion.button>
                )}
              </div>
              {/* Chatbot Integration Button - Appears after fetching */}
              <div>
              {fetchCompleted && (
                <NavLink to="/integration-and-testing">
                  <div>
                    <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="fixed bottom-16 right-5 bg-primary hover:bg-secondary text-white py-2 px-6 rounded-full flex items-center space-x-2 shadow-lg"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Chatbot integration & testing</span>
                  </motion.button>
                </div>
                </NavLink>
              )}
              </div>
            </div>
          </motion.div>

          {/* Web Pages Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {webPages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detected Pages</h2>
                <div className="space-y-4">
                  {webPages.map((page, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                      onClick={() => setSelectedPage(page)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">{page.url}</p>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              page.status === 'Scraped' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {page.status}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPage.url}</h3>
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedPage.status === 'Scraped' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedPage.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Content Chunks</h4>
                    {selectedPage.chunks.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPage.chunks.map((chunk, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gray-50 rounded-lg text-gray-700"
                          >
                            {chunk}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No content chunks available</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
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

export default Get