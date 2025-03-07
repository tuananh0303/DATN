import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '@/constants/owner/Content/content';
import axios from 'axios';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import 'antd/dist/reset.css';
import { SPORT_TYPES, INITIAL_FORM_DATA } from './constants/sportTypes';
import { Popup } from './components/Popup';
import { SportTypeCard } from './components/SportTypeCard';
import { CourtGroupForm } from './components/CourtGroupForm';
import type { 
  FormData, 
  Province, 
  District, 
  Ward, 
  CourtGroup 
} from './interfaces/facility';


const CreateFacility: React.FC = () => {
  // 1. State Declarations
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [isSidebarCollapsedState, setIsSidebarCollapsedState] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [courtGroups, setCourtGroups] = useState<{ [key: string]: CourtGroup[] }>({});

  const [showForm, setShowForm] = useState<string | null>(null);
  const [editingGroup, setEditingGroup] = useState<CourtGroup | null>(null);

  // 2. Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3. Hooks
  const navigate = useNavigate();

  // 4. Constants
  const format = 'HH:mm';
  const progress = ((currentStep - 1) / 3) * 100;

  // 5. Validation Functions
  const isValidOperatingHours = () => {
    const { openTime, closeTime } = formData.facilityInfo;
    if (!openTime || !closeTime) return false;
    
    const openHour = dayjs(openTime, format);
    const closeHour = dayjs(closeTime, format);
    
    return closeHour.isAfter(openHour);
  };

  const isStep1Valid = () => {
    const { name, openTime, closeTime, city, district, ward, address } = formData.facilityInfo;
    return !!(name && openTime && closeTime && city && district && ward && address);
  };

  const isStep2Valid = () => {
    return !!coverImage;
  };

  // 6. Event Handlers
  const handleNext = () => {
    if (currentStep === 1) {
      if (!isStep1Valid()) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        return;
      }
      
      if (!isValidOperatingHours()) {
        alert('Hãy cập nhật lại giờ hoạt động. Giờ đóng cửa phải sau giờ mở cửa');
        return;
      }
      
      console.log('Data saved after Step 1:', formData.facilityInfo);
    }
    
    if (currentStep === 2 && !isStep2Valid()) {
      alert('Vui lòng tải lên ít nhất một hình ảnh');
      return;
    }
    
    if (currentStep === 2) {
      console.log('Data saved after Step 2:', {
        coverImage: coverImage,
        coverImagePreview: coverImagePreview
      });
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveAndExit = async () => {
    try {
      const dataToSave = {
        currentStep,
        formData,
        selectedSports,
        courtGroups,
        coverImagePreview
      };
      await localStorage.setItem('facilityDraft', JSON.stringify(dataToSave));
      navigate('/owner/facility-management');
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleDiscardAndExit = () => {
    localStorage.removeItem('facilityDraft');
    navigate('/owner/facility-management');
  };

  const handleSubmitFacility = async () => {
    try {
      // API call to create facility with pending status
      // await createFacility({ ...formData, status: 'pending' });
      localStorage.removeItem('facilityDraft');
      navigate('/owner/facility-management');
    } catch (error) {
      console.error('Error creating facility:', error);
    }
  };


// 7. API Handlers
const handleProvinceChange = async (provinceCode: string) => {
  try {
    setLoading(true);
    const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    setDistricts(response.data.districts);
    setFormData(prev => ({
      ...prev,
      facilityInfo: {
        ...prev.facilityInfo,
        city: response.data.name,
        provinceCode,
        district: '',
        ward: ''
      }
    }));
  } catch (error) {
    console.error('Error fetching districts:', error);
  } finally {
    setLoading(false);
  }
};

const handleDistrictChange = async (districtCode: string) => {
  try {
    setLoading(true);
    const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    setWards(response.data.wards);
    setFormData(prev => ({
      ...prev,
      facilityInfo: {
        ...prev.facilityInfo,
        district: response.data.name,
        districtCode,
        ward: ''
      }
    }));
  } catch (error) {
    console.error('Error fetching wards:', error);
  } finally {
    setLoading(false);
  }
};

const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const wardCode = e.target.value;
  const selectedWard = wards.find(w => w.code === wardCode || w.code === Number(wardCode));
  
  if (selectedWard) {
    setFormData(prev => ({
      ...prev,
      facilityInfo: {
        ...prev.facilityInfo,
        ward: selectedWard.name,
        wardCode: wardCode
      }
    }));
  }
};

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setCoverImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setCoverImagePreview(result);
      localStorage.setItem('coverImagePreview', result);
    };
    reader.readAsDataURL(file);
  }
};

// 8. Step 3 Specific Handlers
const handleSportSelect = (sportId: string) => {
  setSelectedSports(prev => {
    const isSelected = prev.includes(sportId);
    if (isSelected) {
      const newCourtGroups = { ...courtGroups };
      delete newCourtGroups[sportId];
      setCourtGroups(newCourtGroups);
      return prev.filter(id => id !== sportId);
    } else {
      return [...prev, sportId];
    }
  });
};

const handleSaveCourtGroup = (courtGroup: CourtGroup) => {
  setCourtGroups(prev => {
    const newGroups = { ...prev };
    
    // Nếu là sân tổng hợp, lưu vào tất cả các sport type được chọn
    courtGroup.sportTypeIds.forEach(sportId => {
      if (!newGroups[sportId]) {
        newGroups[sportId] = [];
      }
      // Nếu đang edit thì thay thế group cũ
      if (editingGroup) {
        newGroups[sportId] = newGroups[sportId].map(group => 
          group.id === editingGroup.id ? courtGroup : group
        );
      } else {
        newGroups[sportId].push(courtGroup);
      }
    });
    
    return newGroups;
  });
  
  setShowForm(null);
  setEditingGroup(null);
};

// 9. Effects
useEffect(() => {
  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/p/');
      setProvinces(response.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };
  fetchProvinces();
}, []);

useEffect(() => {
  const handleSidebarChange = (event: CustomEvent) => {
    setIsSidebarCollapsedState(event.detail.collapsed);
  };

  window.addEventListener('sidebarStateChange', handleSidebarChange as EventListener);
  return () => {
    window.removeEventListener('sidebarStateChange', handleSidebarChange as EventListener);
  };
}, []);

useEffect(() => {
  const savedData = localStorage.getItem('facilityDraft');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    setCurrentStep(parsedData.currentStep);
    setFormData(parsedData.formData);
    setSelectedSports(parsedData.selectedSports || []);
    setCourtGroups(parsedData.courtGroups || {});
    if (parsedData.coverImagePreview) {
      setCoverImagePreview(parsedData.coverImagePreview);
    }
  }
}, []);

useEffect(() => {
  console.log('Step changed to:', currentStep);
  if (currentStep === 3) {
    console.log('SPORT_TYPES:', SPORT_TYPES);
    console.log('Selected Sports:', selectedSports);
    console.log('Court Groups:', courtGroups);
    console.log('Form Data:', formData);
  }
}, [currentStep]);

// 10. Render Methods
const renderStep1 = () => (
  <div className="max-w-5xl mx-auto p-6">
    <div className="bg-white rounded-xl shadow-lg p-10">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* Tên cơ sở */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Tên cơ sở <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.facilityInfo.name}
            onChange={(e) => setFormData({
              ...formData,
              facilityInfo: {...formData.facilityInfo, name: e.target.value}
            })}
            className="w-full p-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Nhập tên cơ sở"
          />
        </div>

        {/* Mô tả cơ sở */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Mô tả cơ sở
          </label>
          <textarea
            value={formData.facilityInfo.description}
            onChange={(e) => setFormData({
              ...formData,
              facilityInfo: {...formData.facilityInfo, description: e.target.value}
            })}
            className="w-full p-4 border border-gray-300 rounded-lg text-base min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Mô tả chi tiết về cơ sở của bạn"
          />
        </div>

        {/* Giờ hoạt động */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Giờ hoạt động <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <TimePicker
                className="w-full !h-[52px] text-lg"
                format={format}
                value={formData.facilityInfo.openTime ? dayjs(formData.facilityInfo.openTime, format) : null}
                onChange={(time) => setFormData({
                  ...formData,
                  facilityInfo: {
                    ...formData.facilityInfo,
                    openTime: time ? time.format(format) : ''
                  }
                })}
                minuteStep={30}
                placeholder="Giờ mở cửa"
              />
            </div>
            <div className="flex-1">
              <TimePicker
                className="w-full !h-[52px] text-lg"
                format={format}
                value={formData.facilityInfo.closeTime ? dayjs(formData.facilityInfo.closeTime, format) : null}
                onChange={(time) => setFormData({
                  ...formData,
                  facilityInfo: {
                    ...formData.facilityInfo,
                    closeTime: time ? time.format(format) : ''
                  }
                })}
                minuteStep={30}
                placeholder="Giờ đóng cửa"
              />
            </div>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="space-y-6">
          {/* Tỉnh/Thành phố */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Chọn tỉnh, thành phố <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.facilityInfo.provinceCode || ''}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              disabled={loading}
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map(province => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quận/Huyện */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Chọn quận, huyện <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.facilityInfo.districtCode || ''}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              disabled={!formData.facilityInfo.provinceCode || loading}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map(district => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phường/Xã */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Chọn phường, xã <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.facilityInfo.wardCode || ''}
              onChange={handleWardChange}
              className="w-full p-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              disabled={!formData.facilityInfo.districtCode || loading}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map(ward => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>

          {/* Địa chỉ cụ thể */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Số nhà, tên đường <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.facilityInfo.address}
              onChange={(e) => setFormData({
                ...formData,
                facilityInfo: {...formData.facilityInfo, address: e.target.value}
              })}
              className="w-full p-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Nhập số nhà, tên đường"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);

const renderStep2 = () => (
  <div className="max-w-3xl mx-auto p-6">
    <div className="mb-6">
      <p className="text-gray-500">
        Bạn sẽ cần bắt buộc đăng 1 ảnh bìa đầu tiên. Về sau, bạn có thể thêm các hình ảnh, video minh họa khác.
      </p>
    </div>
    <div 
      className="border-2 border-dashed rounded-lg p-8 py-16 text-center bg-[#dfe3f3] cursor-pointer"
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
              src={ICONS.UPLOAD_IMAGE}
              alt="Upload icon"
              className="w-full h-full rounded-lg"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-[#448ff0] rounded-lg hover:bg-gray-50"
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
  </div>
);

const renderStep3 = () => {
  
  try{
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-10">
        {/* Thông tin cơ sở */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Thông tin cơ sở</h2>
          <p className="text-gray-600">Tên cơ sở: {formData?.facilityInfo?.name || 'N/A'}</p>
        </div>

        {/* Chọn loại hình thể thao */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Chọn loại hình thể thao</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPORT_TYPES?.map(sport => (
              <SportTypeCard
                key={sport.id}
                sport={sport}
                selected={selectedSports?.includes(sport.id)}
                onSelect={() => handleSportSelect(sport.id)}
              />
            ))}
          </div>
        </div>

        {/* Danh sách nhóm sân theo từng môn */}
        {selectedSports.map(sportId => {
          const sport = SPORT_TYPES.find(s => s.id === sportId)!;
          return (
            <div key={sportId} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{sport.name}</h2>
              
              {/* Danh sách nhóm sân đã tạo */}
              {courtGroups[sportId]?.map(group => (
                <div key={group.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      Nhóm {group.courts.length} sân {sport.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingGroup(group);
                          setShowForm(sportId);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => {
                          setCourtGroups(prev => ({
                            ...prev,
                            [sportId]: prev[sportId].filter(g => g.id !== group.id)
                          }));
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Kích thước: {group.courts[0].size}</p>
                    <p>Mặt sân: {group.courts[0].surface}</p>
                    <p>Giá thuê: {group.courts[0].basePrice.toLocaleString()}đ/giờ</p>
                    {group.courts[0].peakHourPricing?.length > 0 && (
                      <p>
                        Giá giờ cao điểm: {(group.courts[0].basePrice + group.courts[0].peakHourPricing[0].priceIncrease).toLocaleString()}đ/giờ
                        ({group.courts[0].peakHourPricing[0].startTime} - {group.courts[0].peakHourPricing[0].endTime})
                      </p>
                    )}
                    {group.isMultiSport && (
                      <p>Loại: Sân tổng hợp ({group.sportTypeIds.map(id => 
                        SPORT_TYPES.find(s => s.id === id)?.name
                      ).join(', ')})</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Form tạo/chỉnh sửa nhóm sân */}
              {showForm === sportId ? (
                <CourtGroupForm
                  sportType={sport}
                  allSportTypes={SPORT_TYPES}
                  onSave={handleSaveCourtGroup}
                  onCancel={() => {
                    setShowForm(null);
                    setEditingGroup(null);
                  }}
                  initialData={editingGroup}
                />
              ) : (
                <button
                  onClick={() => setShowForm(sportId)}
                  className="mt-2 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                >
                  + Thêm nhóm sân {sport.name}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} catch (error) {
  console.error('Error rendering step 3:', error);
  return <div>Error loading facility data</div>;
}
};

// 11. Main Render
return (
  <div className="flex flex-col w-full min-h-screen px-8 pt-12 pb-8 relative">
    {/* Header */}
    <div className="px-6 mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {currentStep === 1 ? 'Bước 1: Điền thông tin của cơ sở bạn muốn tạo' : 
           currentStep === 2 ? 'Bước 2: Tải lên hình ảnh' : 
           'Bước 3: Thêm sân cho cơ sở'}
        </h1>
        <button
          onClick={() => setShowExitPopup(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
        >
          Thoát
        </button>
      </div>
    </div>

    {/* Step Content */}
    <div className="container mx-auto pt-6 pb-14">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && SPORT_TYPES && renderStep3()}
    </div>

    {/* Footer Progress Bar */}
    <div 
      className={`fixed bottom-0 right-0 bg-white shadow-md pb-4 transition-all duration-300 ease-in-out
        ${isSidebarCollapsedState ? 'left-[80px]' : 'left-[240px]'}`}
    >
      <div className="max-w-full">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 h-1.5 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 px-6">
            <span className={currentStep >= 1 ? 'text-blue-500 font-medium' : ''}>
              Thông tin cơ bản
            </span>
            <span className={currentStep >= 2 ? 'text-blue-500 font-medium' : ''}>
              Hình ảnh
            </span>
            <span className={currentStep >= 3 ? 'text-blue-500 font-medium' : ''}>
              Thông tin sân
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between px-4">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Quay lại
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid()) ||
                (currentStep === 2 && !isStep2Valid())
              }
              className={`px-6 py-2 rounded-lg text-white transition-colors ml-auto
                ${(currentStep === 1 && isStep1Valid()) || 
                  (currentStep === 2 && isStep2Valid())
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Tiếp theo
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitPopup(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-auto"
            >
              Hoàn thành
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Popups */}
    <Popup
      isOpen={showExitPopup}
      onClose={() => setShowExitPopup(false)}
      title="Bạn có muốn lưu thông tin cho lần tạo sau không?"
      onConfirm={handleSaveAndExit}
      onCancel={handleDiscardAndExit}
    />

    <Popup
      isOpen={showSubmitPopup}
      onClose={() => setShowSubmitPopup(false)}
      title="Bạn chắc chắn muốn gửi đến admin phê duyệt chứ?"
      onConfirm={handleSubmitFacility}
      onCancel={() => setShowSubmitPopup(false)}
    />
  </div>
);
};

export default CreateFacility;