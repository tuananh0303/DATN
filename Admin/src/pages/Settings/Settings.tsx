import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    siteName: '',
    copyRight: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
    console.log('Logo:', logo);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            {logo ? (
              <img 
                src={URL.createObjectURL(logo)} 
                alt="Uploaded Logo" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="text-gray-400">
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            )}
          </div>
          <label className="cursor-pointer text-blue-500">
            <span>Upload Logo</span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleInputChange}
              placeholder="Bright Web"
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Copy Right
            </label>
            <input
              type="text"
              name="copyRight"
              value={formData.copyRight}
              onChange={handleInputChange}
              placeholder="All rights Reserved@brightweb"
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Title
            </label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleInputChange}
              placeholder="Bright web is a hybrid dashboard"
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Keywords
            </label>
            <input
              type="text"
              name="seoKeywords"
              value={formData.seoKeywords}
              onChange={handleInputChange}
              placeholder="CEO"
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Description
            </label>
            <textarea
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleInputChange}
              placeholder="Bright web is a hybrid dashboard"
              rows={4}
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
