import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/reduxHooks';
// import { ICONS } from '@/constants/owner/Content/content';
import axios from 'axios';
import { message, TimePicker } from 'antd';
import dayjs from 'dayjs';
// import type { Dayjs } from 'dayjs';
import 'antd/dist/reset.css';
import { INITIAL_FORM_DATA } from './constants/sportTypes';
import { Popup } from './components/Popup';
import { SportTypeCard } from './components/SportTypeCard';
import { FieldGroupForm } from './components/FieldGroupForm';
import { fieldService } from '@/services/field.service';
import { 
  createFacility, 
  setCurrentStep, 
  updateFacilityInfo, 
  addImageMetadata, // New action
  removeImageMetadata, // New action
  setSelectedSports,
  addFieldGroup,
  updateFieldGroup,
  resetFacilityForm
} from '@/store/slices/facilitySlice';
import type { 
  FacilityFormData, 
  Province, 
  District, 
  Ward, 
  FieldGroupData ,
  SportType
} from './interfaces/facility';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const CreateFacility: React.FC = () => {

const [images, setImages] = useState<File[]>([]);
const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FacilityFormData>(INITIAL_FORM_DATA);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [sports, setSports] = useState<SportType[]>([]);
  const [selectedSportIds, setSelectedSportIds] = useState<number[]>([]);
  const [fieldGroups, setFieldGroups] = useState<{ [key: string]: FieldGroupData[] }>({});
  const [showForm, setShowForm] = useState<number | null>(null);
  const [editingGroup, setEditingGroup] = useState<FieldGroupData | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Constants
  const format = 'HH:mm';
  const progress = ((currentStep - 1) / 3) * 100;


  const fetchSports = async () => {
    try {
      const response = await fieldService.getSport();
      // console.log(response);
      if (response && Array.isArray(response)) {
        setSports(response);
      } else {
        console.error('Invalid sports data format:', response);
        message.error('Không thể tải dữ liệu môn thể thao');
      }
    } catch (error) {
      console.error('Error fetching sports:', error);
      message.error('Không thể tải dữ liệu môn thể thao');
    }
  };
  // Fetch sports from API
  useEffect(() => {    
    fetchSports();
  }, []);

  // Fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://provinces.open-api.vn/api/p/');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProvinces();
  }, []);

  // Listen for sidebar changes
  // useEffect(() => {
  //   const handleSidebarChange = (event: CustomEvent) => {
  //     setIsSidebarCollapsedState(event.detail.isCollapsed);
  //   };
    
  //   window.addEventListener('sidebarCollapsedChange', handleSidebarChange as EventListener);
    
  //   return () => {
  //     window.removeEventListener('sidebarCollapsedChange', handleSidebarChange as EventListener);
  //   };
  // }, []);

  // Validation Functions
  const isValidOperatingHours = () => {
    const { openTime, closeTime } = formData.facilityInfo;
    if (!openTime || !closeTime) return false;
    
    const openHour = dayjs(openTime, format);
    const closeHour = dayjs(closeTime, format);
    
    return closeHour.isAfter(openHour);
  };
  
  const isValidFacilityName = (name: string) => {
    return name.length >= 5 && name.length <= 255;
  };
  
  const isStep1Valid = () => {
    const { name, openTime, closeTime, city, district, ward, address } = formData.facilityInfo;
    return !!(name && openTime && closeTime && city && district && ward && address);
  };

  const isStep2Valid = () => {
    return images.length > 0;
  };

  const isStep3Valid = () => {
    return Object.keys(fieldGroups).length > 0;
  };

  // Event Handlers
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
      dispatch(updateFacilityInfo(formData.facilityInfo));
    }
    
    if (currentStep === 2 && !isStep2Valid()) {
      alert('Vui lòng tải lên ít nhất một hình ảnh');
      return;
    }
    
    // No need to dispatch addImage here anymore since we're doing it in handleImageUpload
    
    dispatch(setCurrentStep(Math.min(currentStep + 1, 3)));
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(Math.max(currentStep - 1, 1)));
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveAndExit = async () => {
    try {
      const dataToSave = {
        currentStep,
        formData,
        selectedSportIds,
        fieldGroups,
        imagesPreview
      };
      await localStorage.setItem('facilityDraft', JSON.stringify(dataToSave));
      navigate('/owner/facility-management');
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleDiscardAndExit = () => {
    localStorage.removeItem('facilityDraft');
    dispatch(resetFacilityForm());
    navigate('/owner/facility-management');
  };

  const handleSubmitFacility = async () => {
    try {

    setIsSubmitting(true); // Bắt đầu loading
    setShowSubmitPopup(false); // Đóng popup xác nhận

      console.log('Submitting facility with data:', {
        formData,
        fieldGroups,
        images
      });
      
      // Create location string
      const location = `${formData.facilityInfo.address}, ${formData.facilityInfo.ward}, ${formData.facilityInfo.district}, ${formData.facilityInfo.city}`;
      
      // Prepare field groups data
      const fieldGroupsData = [];
      let index = 0;
      for (const sportId in fieldGroups) {
        for (const group of fieldGroups[sportId]) {
          index++;
          fieldGroupsData.push({
            name: group.name || `Nhóm sân ${index}`,
            dimension: group.dimension,
            surface: group.surface,
            basePrice: Number(group.basePrice),
            peakStartTime: group.peakStartTime,
            peakEndTime: group.peakEndTime,
            priceIncrease: Number(group.priceIncrease),
            sportIds: [Number(sportId)],
            fieldsData: group.fieldsData.map(field => ({ name: field.name }))
          });
        }
      }
      
      // Prepare facility data
      const facilityData = {
        name: formData.facilityInfo.name,
        description: formData.facilityInfo.description,
        openTime: formData.facilityInfo.openTime,
        closeTime: formData.facilityInfo.closeTime,
        location: location,
        fieldGroupsData: fieldGroupsData
      };
      console.log('Final facility data:', facilityData);
      
      // Create FormData object
      const apiFormData = new FormData();
      
      // Add JSON data
      apiFormData.append('data', JSON.stringify(facilityData));
      
      // Add images
      images.forEach(image => {
        apiFormData.append('images', image);
      });
      
      // Dispatch create facility action và đợi kết quả
    const result = await dispatch(createFacility(apiFormData)).unwrap();
      // Hiển thị thông báo thành công
    message.success('Tạo cơ sở thành công!');
      // Clear local storage and navigate back
      localStorage.removeItem('facilityDraft');
      navigate('/owner/facility-management');
    } catch (error) {
      console.error('Error creating facility:', error);
    }finally {
      setIsSubmitting(false); // Kết thúc loading dù thành công hay thất bại
    }
  };

  // API Handlers
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
    const files = e.target.files;
  if (files && files.length > 0) {
    const newImages = Array.from(files);
    setImages(prev => [...prev, ...newImages]);
    
    // Create previews for new images
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagesPreview(prev => [...prev, result]);
        
        // Add metadata to Redux (not the actual File)
        dispatch(addImageMetadata({ 
          name: file.name, 
          size: file.size, 
          type: file.type,
          preview: result 
        }));
      };
      reader.readAsDataURL(file);
    });
  }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  setImagesPreview(prev => prev.filter((_, i) => i !== index));
  dispatch(removeImageMetadata(index));
  };

  // Step 3 Specific Handlers
  const handleSportSelect = (sportId: number) => {
    setSelectedSportIds(prev => {
      const isSelected = prev.includes(sportId);
      if (isSelected) {
        const newFieldGroups = { ...fieldGroups };
        delete newFieldGroups[sportId.toString()];
        setFieldGroups(newFieldGroups);
        return prev.filter(id => id !== sportId);
      } else {
        return [...prev, sportId];
      }
    });
    
    // Update Redux store
    dispatch(setSelectedSports(selectedSportIds));
  };

  const handleSaveFieldGroup = (fieldGroup: FieldGroupData) => {
    const sportId = showForm?.toString() || '';
    
    setFieldGroups(prev => {
      const newGroups = { ...prev };
      
      if (!newGroups[sportId]) {
        newGroups[sportId] = [];
      }
      
      if (editingGroup) {
        // Find and replace the existing group
        const index = newGroups[sportId].findIndex(group => 
          group.dimension === editingGroup.dimension && 
          group.surface === editingGroup.surface
        );
        
        if (index !== -1) {
          newGroups[sportId][index] = fieldGroup;
          
          // Update in Redux store
          dispatch(updateFieldGroup({ 
            sportId, 
            index, 
            fieldGroup 
          }));
        }
      } else {
        // Add new group
        newGroups[sportId].push(fieldGroup);
        
        // Add to Redux store
        dispatch(addFieldGroup({ sportId, fieldGroup }));
      }
      
      return newGroups;
    });
    
    setShowForm(null);
    setEditingGroup(null);
  };

// Thêm hàm xử lý kéo thả
const handleDragEnd = (result: any) => {
  if (!result.destination) return;

  const items = Array.from(imagesPreview);
  const itemsFile = Array.from(images);
  
  const [reorderedPreviewItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedPreviewItem);
  
  const [reorderedFileItem] = itemsFile.splice(result.source.index, 1);
  itemsFile.splice(result.destination.index, 0, reorderedFileItem);

  setImagesPreview(items);
  setImages(itemsFile);
};


  // Render Functions
  const renderStep1 = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Thông tin cơ bản</h2>
      
      {/* Facility Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Tên cơ sở <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={formData.facilityInfo.name}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            facilityInfo: {
              ...prev.facilityInfo,
              name: e.target.value
            }
          }))}
          placeholder="Nhập tên cơ sở thể thao"
        />
        {formData.facilityInfo.name && !isValidFacilityName(formData.facilityInfo.name) && (
    <p className="text-red-500 text-sm mt-1">Tên cơ sở phải có độ dài từ 5 đến 255 ký tự</p>
  )}
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Mô tả
        </label>
        <textarea
          className="w-full p-2 border rounded h-24"
          value={formData.facilityInfo.description}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            facilityInfo: {
              ...prev.facilityInfo,
              description: e.target.value
            }
          }))}
          placeholder="Mô tả về cơ sở thể thao của bạn"
        />
      </div>
      
      {/* Operating Hours */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Giờ hoạt động <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Mở cửa</label>
            <TimePicker
              className="w-full"
              format={format}
              value={formData.facilityInfo.openTime ? dayjs(formData.facilityInfo.openTime, format) : null}
              onChange={(time) => setFormData(prev => ({
                ...prev,
                facilityInfo: {
                  ...prev.facilityInfo,
                  openTime: time ? time.format(format) : ''
                }
              }))}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Đóng cửa</label>
            <TimePicker
              className="w-full"
              format={format}
              value={formData.facilityInfo.closeTime ? dayjs(formData.facilityInfo.closeTime, format) : null}
              onChange={(time) => setFormData(prev => ({
                ...prev,
                facilityInfo: {
                  ...prev.facilityInfo,
                  closeTime: time ? time.format(format) : ''
                }
              }))}
            />
          </div>
        </div>
        {!isValidOperatingHours() && formData.facilityInfo.openTime && formData.facilityInfo.closeTime && (
          <p className="text-red-500 text-sm mt-1">Giờ đóng cửa phải sau giờ mở cửa</p>
        )}
      </div>
      
      {/* Location */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
        
        {/* Province */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Tỉnh/Thành phố <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border rounded"
            value={formData.facilityInfo.provinceCode}
            onChange={(e) => handleProvinceChange(e.target.value)}
            disabled={loading}
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* District */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Quận/Huyện <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border rounded"
            value={formData.facilityInfo.districtCode}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={loading || !formData.facilityInfo.provinceCode}
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Ward */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Phường/Xã <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border rounded"
            value={formData.facilityInfo.wardCode}
            onChange={handleWardChange}
            disabled={loading || !formData.facilityInfo.districtCode}
          >
            <option value="">Chọn Phường/Xã</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Address */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Địa chỉ cụ thể <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.facilityInfo.address}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              facilityInfo: {
                ...prev.facilityInfo,
                address: e.target.value
              }
            }))}
            placeholder="Số nhà, tên đường..."
          />
        </div>
        
        {/* Preview full address */}
        {formData.facilityInfo.address && formData.facilityInfo.ward && formData.facilityInfo.district && formData.facilityInfo.city && (
          <div className="p-3 bg-gray-50 rounded-lg mt-2">
            <p className="text-sm font-medium">Địa chỉ đầy đủ:</p>
            <p className="text-sm">
              {formData.facilityInfo.address}, {formData.facilityInfo.ward}, {formData.facilityInfo.district}, {formData.facilityInfo.city}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Hình ảnh cơ sở</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Tải lên hình ảnh của cơ sở thể thao. Hình ảnh đầu tiên sẽ được sử dụng làm ảnh bìa.
        </p>
        
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Nhấp để tải lên</span> hoặc kéo thả</p>
              <p className="text-xs text-gray-500">PNG, JPG (Tối đa 10MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              multiple
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </label>
        </div>
      </div>
      
      {/* Image Preview Thay thế phần render preview ảnh trong renderStep2 */}
    
{imagesPreview.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Hình ảnh đã tải lên</h3>
    <p className="text-sm text-gray-500 mb-4">Kéo thả để sắp xếp lại vị trí ảnh. Ảnh đầu tiên sẽ được sử dụng làm ảnh bìa.</p>
    
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => (
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {imagesPreview.map((preview, index) => (
              <Draggable key={preview} draggableId={preview} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`relative group ${snapshot.isDragging ? 'z-50' : ''}`}
                  >
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs py-1 text-center">
                        Ảnh bìa
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Kéo để di chuyển
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>
)}
    </div>
  );

  const renderStep3 = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Thông tin sân</h2>
        
        {/* Sport Type Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Chọn loại hình thể thao</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sports.map((sport) => (
              <SportTypeCard
                key={sport.id}
                sport={sport}
                selected={selectedSportIds.includes(sport.id)}
                onSelect={() => handleSportSelect(sport.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Field Groups */}
        {selectedSportIds.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Nhóm sân</h3>
            
            {selectedSportIds.map((sportId) => {
              const sport = sports.find(s => s.id === sportId);
              if (!sport) return null;
              
              return (
                <div key={sportId} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{sport.name}</h4>
                    <button
                      type="button"
                      className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                      onClick={() => {
                        setShowForm(sportId);
                        setEditingGroup(null);
                      }}
                    >
                      + Thêm nhóm sân
                    </button>
                  </div>
                  
                  {fieldGroups[sportId.toString()] && fieldGroups[sportId.toString()].length > 0 ? (
                    <div className="space-y-3">
                      {fieldGroups[sportId.toString()].map((group, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{group.dimension} - {group.surface}</h5>
                              <p className="text-sm text-gray-600">Giá cơ bản: {group.basePrice.toLocaleString()} VNĐ/giờ</p>
                              <p className="text-sm text-gray-600">
                                Giờ cao điểm: {group.peakStartTime} - {group.peakEndTime} 
                                (+{group.priceIncrease.toLocaleString()} VNĐ)
                              </p>
                              <div className="mt-2">
                                <p className="text-sm font-medium">Danh sách sân:</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {group.fieldsData.map((field, fieldIndex) => (
                                    <span key={fieldIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                      {field.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => {
                                setShowForm(sportId);
                                setEditingGroup(group);
                              }}
                            >
                              Chỉnh sửa
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-lg p-4 text-center text-gray-500">
                      Chưa có nhóm sân nào. Nhấn "Thêm nhóm sân" để tạo mới.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* Field Group Form */}
        {showForm !== null && (
          <FieldGroupForm
            sport={sports.find(s => s.id === showForm)!}
            allSports={sports}
            onSave={handleSaveFieldGroup}
            onCancel={() => {
              setShowForm(null);
              setEditingGroup(null);
            }}
            initialData={editingGroup || undefined}
          />
        )}
      </div>
    );
  };

// 11. Main Render
return (
    <div className='p-8'>
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Tạo cơ sở thể thao mới</h1>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          onClick={() => setShowExitPopup(true)}
        >
          Lưu & Thoát
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => setShowExitPopup(true)}
        >
          Hủy
        </button>
      </div>
    </div>
    
    {/* Progress Bar */}
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Bước {currentStep}/3</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
    
    {/* Step Content */}
    {currentStep === 1 && renderStep1()}
    {currentStep === 2 && renderStep2()}
    {currentStep === 3 && renderStep3()}
    
    {/* Navigation Buttons */}
    <div className="mt-6 flex justify-between">
      <button
        type="button"
        className={`px-4 py-2 border rounded-md ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
        onClick={handleBack}
        disabled={currentStep === 1}
      >
        Quay lại
      </button>
      
      {currentStep < 3 ? (
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleNext}
        >
          Tiếp theo
        </button>
      ) : (
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => setShowSubmitPopup(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
      <>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Đang xử lý...
      </>
    ) : (
      'Hoàn tất'
    )}
  </button>
      )}
    </div>
    
    {/* Exit Popup */}
    {showExitPopup && (
      <Popup
        title="Lưu tiến trình?"
        message="Bạn có muốn lưu tiến trình hiện tại để tiếp tục sau không?"
        confirmText="Lưu & Thoát"
        cancelText="Hủy bỏ"
        onConfirm={handleSaveAndExit}
        onCancel={() => setShowExitPopup(false)}
        onDiscard={handleDiscardAndExit}
        showDiscard={true}
        discardText="Không lưu & Thoát"
      />
    )}
    
    {/* Submit Popup */}
    {showSubmitPopup && (
      <Popup
        title="Xác nhận tạo cơ sở"
        message="Bạn có chắc chắn muốn tạo cơ sở thể thao này không?"
        confirmText="Tạo cơ sở"
        cancelText="Hủy bỏ"
        onConfirm={handleSubmitFacility}
        onCancel={() => setShowSubmitPopup(false)}
      />
    )}
  </div>
);
};

export default CreateFacility;