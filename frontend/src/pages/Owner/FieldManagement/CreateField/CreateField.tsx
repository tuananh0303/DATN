import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SPORT_TYPES } from './constants/sportTypes';
import { FacilitySelector } from './components/FacilitySelector';
import { SportTypeCard } from './components/SportTypeCard';
import { CourtGroupForm } from './components/CourtGroupForm';
import type { CreateFieldFormData, CourtGroup } from './interfaces/field';

const CreateField: React.FC = () => {
  const navigate = useNavigate();
  
  // State declarations
  const [formData, setFormData] = useState<CreateFieldFormData>({
    facilityId: '',
    courtGroups: []
  });
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [showForm, setShowForm] = useState<string | null>(null);
  const [editingGroup, setEditingGroup] = useState<CourtGroup | null>(null);

  // Handlers
  const handleFacilitySelect = (facilityId: string) => {
    setFormData(prev => ({ ...prev, facilityId }));
  };

  const handleSportSelect = (sportId: string) => {
    setSelectedSports(prev => {
      const isSelected = prev.includes(sportId);
      if (isSelected) {
        // Remove sport and its court groups
        setFormData(prev => ({
          ...prev,
          courtGroups: prev.courtGroups.filter(
            group => !group.sportTypeIds.includes(sportId)
          )
        }));
        return prev.filter(id => id !== sportId);
      } else {
        return [...prev, sportId];
      }
    });
  };

  const handleSaveCourtGroup = (courtGroup: CourtGroup) => {
    setFormData(prev => {
      const newGroups = [...prev.courtGroups];
      if (editingGroup) {
        const index = newGroups.findIndex(g => g.id === editingGroup.id);
        if (index !== -1) {
          newGroups[index] = { ...courtGroup, facilityId: prev.facilityId };
        }
      } else {
        newGroups.push({ ...courtGroup, facilityId: prev.facilityId });
      }
      return { ...prev, courtGroups: newGroups };
    });
    
    setShowForm(null);
    setEditingGroup(null);
  };

  const handleSubmit = async () => {
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/courts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      navigate('/owner/field-management');
    } catch (error) {
      console.error('Error creating courts:', error);
    }
  };

  // Validation
  const isFormValid = () => {
    return formData.facilityId && formData.courtGroups.length > 0;
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-8 pt-12 pb-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Thêm sân mới</h1>
          <button
            onClick={() => navigate('/owner/field-management')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Hủy
          </button>
        </div>

        {/* Facility Selector */}
        <div className="mb-8">
          <FacilitySelector
            selectedFacility={formData.facilityId}
            onSelect={handleFacilitySelect}
          />
        </div>

        {formData.facilityId && (
          <>
            {/* Sport Type Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Chọn loại hình thể thao
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SPORT_TYPES.map(sport => (
                  <SportTypeCard
                    key={sport.id}
                    sport={sport}
                    selected={selectedSports.includes(sport.id)}
                    onSelect={() => handleSportSelect(sport.id)}
                  />
                ))}
              </div>
            </div>

            {/* Court Groups */}
            {selectedSports.map(sportId => {
              const sport = SPORT_TYPES.find(s => s.id === sportId)!;
              const groups = formData.courtGroups.filter(g =>
                g.sportTypeIds.includes(sportId)
              );

              return (
                <div key={sportId} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{sport.name}</h2>
                  
                  {/* Existing Court Groups */}
                  {groups.map(group => (
                    <div key={group.id} className="mb-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">
                          {group.name} ({group.courts.length} sân)
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
                              setFormData(prev => ({
                                ...prev,
                                courtGroups: prev.courtGroups.filter(
                                  g => g.id !== group.id
                                )
                              }));
                            }}
                            className="text-red-500 hover:text-red-600"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add/Edit Form */}
                  {showForm === sportId && (
                    <CourtGroupForm
                      sportType={sport}
                      allSportTypes={SPORT_TYPES}
                      onSave={handleSaveCourtGroup}
                      onCancel={() => {
                        setShowForm(null);
                        setEditingGroup(null);
                      }}
                      initialData={editingGroup || undefined}
                    />
                  )}

                  {showForm !== sportId && (
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

            {/* Submit Button */}
            {selectedSports.length > 0 && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className={`px-6 py-2 rounded-lg text-white ${
                    isFormValid()
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Tạo sân
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateField;
