import React, { useState, useRef } from 'react';

interface CreateFacilityStep2Props {
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: (data: ImageUploadData) => void;
}

interface ImageUploadData {
  coverImage: File | null;
  additionalImages: File[];
}

const CreateFacilityStep2: React.FC<CreateFacilityStep2Props> = ({
  onNext,
  onBack,
  onSubmit
}) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coverImage) {
      onSubmit?.({
        coverImage,
        additionalImages: []
      });
      onNext?.();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Bước 1: Điền thông tin của cơ sở bạn muốn tạo</h1>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thoát
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-500">
          Bạn sẽ cần bắt buộc đăng 1 ảnh bìa đầu tiên. Về sau, bạn có thể thêm các hình ảnh, video minh họa khác.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Area */}
        <div 
          className="border-2 border-dashed rounded-lg p-8 text-center"
          onClick={() => fileInputRef.current?.click()}
        >
          {coverImagePreview ? (
            <div className="relative">
              <img
                src={coverImagePreview}
                alt="Cover preview"
                className="max-h-[400px] mx-auto rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setCoverImage(null);
                  setCoverImagePreview('');
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto">
                <img
                  src="/path-to-camera-icon.png"
                  alt="Upload icon"
                  className="w-full h-full"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Thêm ảnh
              </button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Quay lại
          </button>
          <button
            type="submit"
            disabled={!coverImage}
            className={`px-6 py-2 rounded-lg text-white
              ${coverImage 
                ? 'bg-black hover:bg-gray-800' 
                : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Tiếp theo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFacilityStep2; 