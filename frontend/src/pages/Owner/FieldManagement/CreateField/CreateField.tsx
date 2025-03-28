import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchFacilityList } from '@/store/slices/facilitySlice';
import { createFieldGroup } from '@/store/slices/fieldSlice';
import { fieldService } from '@/services/field.service';
import { SportTypeCard } from './components/SportTypeCard';
import { FieldGroupForm } from './components/FieldGroupForm';
import { Popup } from './components/Popup';
// import { SPORT_TYPES } from './constants/sportTypes';
// import { Sport, Field, FieldGroup } from '@/store/slices/fieldSlice';

// Interfaces
interface FieldData {
  name: string;
}

interface FieldGroupFormData {
  name: string;
  dimension: string;
  surface: string;
  basePrice: number;
  peakStartTime: string;
  peakEndTime: string;
  priceIncrease: number;
  sportIds: number[];
  fieldsData: FieldData[];
}

const CreateField: React.FC = () => {
  console.time('Component Render Time');
  console.log('Component rendering started');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { facilityList, facilityListLoading } = useAppSelector(state => state.facility);
  const { loading: fieldGroupLoading, error: fieldGroupError } = useAppSelector(state => state.field);
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [selectedSports, setSelectedSports] = useState<number[]>([]);
  const [sports, setSports] = useState<any[]>([]);
  const [showForm, setShowForm] = useState<number | null>(null);
  const [editingGroup, setEditingGroup] = useState<FieldGroupFormData | null>(null);
  const [fieldGroups, setFieldGroups] = useState<{ [key: string]: FieldGroupFormData[] }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Popup states
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false)

  // Fetch facilities and sports on component mount
  useEffect(() => {
    dispatch(fetchFacilityList());
    console.log('Facility list fetched successfully');
    fetchSports();
  }, [dispatch]);

  // Fetch sports from API
  const fetchSports = async () => {
    try {
      const sportsData = await fieldService.getSport();
      setSports(sportsData);
    } catch (error) {
      console.error('Error fetching sports:', error);
    }
  };

  // Handle facility selection
  const handleFacilitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Facility selected:', e.target.value);
    setSelectedFacilityId(e.target.value);
  };

  // Handle sport selection
  const handleSportSelect = (sportId: number) => {
    setSelectedSports(prev => {
      const isSelected = prev.includes(sportId);
      if (isSelected) {
        // Remove sport and its field groups
        const newFieldGroups = { ...fieldGroups };
        delete newFieldGroups[sportId.toString()];
        setFieldGroups(newFieldGroups);
        return prev.filter(id => id !== sportId);
      } else {
        return [...prev, sportId];
      }
    });
  };

  // Handle save field group
  const handleSaveFieldGroup = (fieldGroup: FieldGroupFormData) => {
    console.log('Saving field group:', fieldGroup);
    const sportId = showForm?.toString() || '';
    
    setFieldGroups(prev => {
      const newGroups = { ...prev };
      
      if (!newGroups[sportId]) {
        newGroups[sportId] = [];
      }
      
      if (editingGroup) {
        // Find and replace the existing group
        const index = newGroups[sportId].findIndex(group => 
          group.name === editingGroup.name
        );
        
        if (index !== -1) {
          newGroups[sportId][index] = fieldGroup;
        }
      } else {
        // Add new group
        newGroups[sportId].push(fieldGroup);
      }
      
      return newGroups;
    });
    
    setShowForm(null);
    setEditingGroup(null);
  };

  // Handle save and exit
  const handleSaveAndExit = async () => {
    try {
      const dataToSave = {
        selectedFacilityId,
        selectedSports,
        fieldGroups
      };
      await localStorage.setItem('fieldDraft', JSON.stringify(dataToSave));
      navigate('/owner/field-management');
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Handle discard and exit
  const handleDiscardAndExit = () => {
    localStorage.removeItem('fieldDraft');
    navigate('/owner/field-management');
  };

  // Handle form submission
  const handleSubmitField = async () => {
    console.log('Submitting field form');
    if (!selectedFacilityId) {
      alert('Vui lòng chọn cơ sở');
      return;
    }

    if (Object.keys(fieldGroups).length === 0) {
      alert('Vui lòng thêm ít nhất một nhóm sân');
      return;
    }

    try {
      console.time('Field Group Creation API Call');
      setFormSubmitted(true);      
      // Prepare field groups data
      const fieldGroupsData: FieldGroupFormData[] = [];
      
      for (const sportId in fieldGroups) {
        for (const group of fieldGroups[sportId]) {
          // fieldGroupsData.push({
          //   name: group.name,
          //   dimension: group.dimension,
          //   surface: group.surface,
          //   basePrice: group.basePrice,
          //   peakStartTime: group.peakStartTime,
          //   peakEndTime: group.peakEndTime,
          //   priceIncrease: group.priceIncrease,
          //   sportIds: [parseInt(sportId)],
          //   fieldsData: group.fieldsData
          // });
          const existingGroupIndex = fieldGroupsData.findIndex(
            existingGroup => existingGroup.name === group.name
          );
          
          if (existingGroupIndex !== -1) {
            // Nếu nhóm sân đã tồn tại, thêm sportId vào mảng sportIds
            if (!fieldGroupsData[existingGroupIndex].sportIds.includes(parseInt(sportId))) {
              fieldGroupsData[existingGroupIndex].sportIds.push(parseInt(sportId));
            }
          } else {
            // Nếu nhóm sân chưa tồn tại, thêm mới
            fieldGroupsData.push({
              name: group.name,
              dimension: group.dimension,
              surface: group.surface,
              basePrice: group.basePrice,
              peakStartTime: group.peakStartTime,
              peakEndTime: group.peakEndTime,
              priceIncrease: group.priceIncrease,
              sportIds: [parseInt(sportId)],
              fieldsData: group.fieldsData
            });
        }
      }
    }
      console.log('Field groups data being sent to API:', { facilityId: selectedFacilityId, data: { fieldGroupsData } });
      // Dispatch create field group action
      await dispatch(createFieldGroup({ 
        facilityId: selectedFacilityId, 
        data: { fieldGroupsData } 
      })).unwrap();
      
      console.timeEnd('Field Group Creation API Call');
      console.log('Field groups created successfully');

      // Clear local storage and navigate back
      localStorage.removeItem('fieldDraft');
      navigate('/owner/field-management');
    } catch (error) {
      console.error('Error creating field groups:', error);
      setFormSubmitted(false);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return selectedFacilityId && Object.keys(fieldGroups).length > 0;
  };

  // Handle exit button click
  const handleExitClick = () => {
    // Only show popup if there are changes
    if (selectedFacilityId || selectedSports.length > 0 || Object.keys(fieldGroups).length > 0) {
      setShowExitPopup(true);
    } else {
      navigate('/owner/field-management');
    }
  };

  console.timeEnd('Component Render Time');

  return (
    <div className="flex flex-col w-full min-h-screen px-8 pt-12 pb-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Thêm sân mới</h1>
          <button
            onClick={handleExitClick}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Hủy
          </button>
        </div>

        {/* Facility Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Chọn cơ sở</h2>
          <div className="relative">
            <select
              value={selectedFacilityId}
              onChange={handleFacilitySelect}
              className="w-full appearance-none border border-black/70 rounded-xl px-5 py-2
                       text-lg font-roboto bg-white cursor-pointer focus:outline-none"
              disabled={facilityListLoading || formSubmitted}
            >
              <option value="">Chọn cơ sở của bạn</option>
              {facilityList.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-4 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {selectedFacilityId && (
          <>
            {/* Sport Type Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Chọn loại hình thể thao
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sports.map(sport => (
                  <SportTypeCard
                    key={sport.id}
                    sport={{
                      id: sport.id,
                      name: sport.name,
                      // defaultPricing: 150000, // Default pricing
                      // standardSizes: ["13.4m x 6.1m", "15m x 7m"], // Default sizes
                      // surfaceTypes: ["Thảm cao su", "Gỗ công nghiệp"] // Default surfaces
                    }}
                    selected={selectedSports.includes(sport.id)}
                    onSelect={() => handleSportSelect(sport.id)}
                  />
                ))}
              </div>
            </div>

            {/* Field Groups */}
            {selectedSports.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Nhóm sân</h3>
                
                {selectedSports.map((sportId) => {
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
                          disabled={formSubmitted}
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
                                  <h5 className="font-medium">{group.name || `Nhóm sân ${index + 1}`}</h5>
                                  <p className="text-sm text-gray-600">{group.dimension} - {group.surface}</p>
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
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => {
                                      setShowForm(sportId);
                                      setEditingGroup(group);
                                    }}
                                    disabled={formSubmitted}
                                  >
                                    Chỉnh sửa
                                  </button>
                                  <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => {
                                      const newGroups = { ...fieldGroups };
                                      newGroups[sportId.toString()] = newGroups[sportId.toString()].filter((_, i) => i !== index);
                                      if (newGroups[sportId.toString()].length === 0) {
                                        delete newGroups[sportId.toString()];
                                      }
                                      setFieldGroups(newGroups);
                                    }}
                                    disabled={formSubmitted}
                                  >
                                    Xóa
                                  </button>
                                </div>
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

            {/* Submit Button */}
            {selectedSports.length > 0 && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowSubmitPopup(true)}
                  disabled={!isFormValid() || formSubmitted || fieldGroupLoading}
                  className={`px-6 py-2 rounded-lg text-white ${
                    isFormValid() && !formSubmitted && !fieldGroupLoading
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {fieldGroupLoading ? 'Đang tạo...' : 'Tạo sân'}
                </button>
              </div>
            )}

            {/* Error message */}
            {fieldGroupError && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {fieldGroupError}
              </div>
            )}
          </>
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
          title="Xác nhận tạo sân"
          message="Bạn có chắc chắn muốn tạo nhóm sân này không?"
          confirmText="Tạo sân"
          cancelText="Hủy bỏ"
          onConfirm={handleSubmitField}
          onCancel={() => setShowSubmitPopup(false)}
        />
      )}
    </div>
  );
};

export default CreateField;