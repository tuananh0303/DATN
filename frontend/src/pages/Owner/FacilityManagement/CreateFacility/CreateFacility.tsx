import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Typography, 
  Steps, 
  Card, 
  message
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SaveOutlined, 
  PictureOutlined, 
  AppstoreOutlined, 
  SafetyCertificateOutlined, 
  RightOutlined, 
  LeftOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { FacilityFormData } from '@/types/facility.type';
import { Sport } from '@/types/sport.type';
import { facilityService } from '@/services/facility.service';
import { sportService } from '@/services/sport.service';
import BasicInfoForm, { BasicInfoFormRef } from './components/BasicInfoForm';
import ImagesUpload from './components/ImagesUpload';
import FieldGroupsForm from './components/FieldGroupsForm';
import VerificationDocuments from './components/VerificationDocuments';

const { Title } = Typography;
const { Step } = Steps;

interface StepComponentProps {
  onNext: () => void;
  onPrev: () => void;
  formData: FacilityFormData;
  updateFormData: (data: Partial<FacilityFormData>) => void;
  allSports: Sport[];
}

const CreateFacility: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [allSports, setAllSports] = useState<Sport[]>([]);
  const basicInfoFormRef = useRef<BasicInfoFormRef>(null);
  const [formData, setFormData] = useState<FacilityFormData>({
    facilityInfo: {
      name: '',
      description: '',
      location: '',
      openTime1: '',
      closeTime1: '',
      openTime2: '',
      closeTime2: '',
      openTime3: '',
      closeTime3: '',
      numberOfShifts: 1,
      city: '',
      provinceCode: '',
      district: '',
      districtCode: '',
      ward: '',
      wardCode: ''
    },
    imageFiles: [],
    fieldGroups: [],
    selectedSports: [],
    certificateFile: null,
    licenseFiles: []
  });

  useEffect(() => {
    // Fetch sports data
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await sportService.getSport();
      if (response && Array.isArray(response)) {
        setAllSports(response);
      } else {
        // If real API fails, use mock data
        const mockSports: Sport[] = [
          { id: 1, name: 'football' },
          { id: 2, name: 'tennis' },
          { id: 3, name: 'futsal' },
          { id: 4, name: 'basketball' },
          { id: 5, name: 'badminton' },
          { id: 6, name: 'swimming' },
          { id: 7, name: 'golf' }
        ];
        setAllSports(mockSports);
      }
    } catch (error) {
      console.error('Error fetching sports:', error);
      message.error('Không thể tải dữ liệu môn thể thao');
      
      // Use mock data as fallback
      const mockSports: Sport[] = [
        { id: 1, name: 'football' },
        { id: 2, name: 'tennis' },
        { id: 3, name: 'futsal' },
        { id: 4, name: 'basketball' },
        { id: 5, name: 'badminton' },
        { id: 6, name: 'swimming' },
        { id: 7, name: 'golf' }
      ];
      setAllSports(mockSports);
    }
  };

  const steps = [
    {
      title: 'Thông tin cơ bản',
      icon: <InfoCircleOutlined />,
      content: (props: StepComponentProps) => <BasicInfoForm {...props} />
    },
    {
      title: 'Hình ảnh',
      icon: <PictureOutlined />,
      content: (props: StepComponentProps) => <ImagesUpload {...props} />
    },
    {
      title: 'Nhóm sân',
      icon: <AppstoreOutlined />,
      content: (props: StepComponentProps) => <FieldGroupsForm {...props} />
    },
    {
      title: 'Xác thực',
      icon: <SafetyCertificateOutlined />,
      content: (props: StepComponentProps) => <VerificationDocuments
        formData={props.formData}
        updateFormData={props.updateFormData}
      />
    }
  ];

  const next = async () => {
    try {
      // Validation for each step
      if (current === 0) {
        // Validate basic info form
        if (basicInfoFormRef.current) {
          await basicInfoFormRef.current.validateFields();
        }
      } else if (current === 1) {
        // Validate images
        if (formData.imageFiles.length === 0) {
          message.error('Vui lòng tải lên ít nhất một hình ảnh');
          return;
        }
      } else if (current === 2) {
        // Validate field groups
        if (formData.selectedSports.length === 0) {
          message.error('Vui lòng chọn ít nhất một môn thể thao');
          return;
        }
        
        if (formData.fieldGroups.length === 0) {
          message.error('Vui lòng tạo ít nhất một nhóm sân');
          return;
        }
      }
      
      setCurrent(current + 1);
    } catch {
      // Form validation failed, no need to show error message as it's already shown by form validation
      return;
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const updateFormData = (data: Partial<FacilityFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const handleSubmit = async () => {
    // Validate certificate upload (required)
    if (!formData.certificateFile) {
      message.error('Vui lòng tải lên giấy chứng nhận cơ sở');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Prepare data for API submission
      const formDataForApi = new FormData();
      
      // Add basic info as JSON
      formDataForApi.append('facilityInfo', JSON.stringify(formData.facilityInfo));
      
      // Add images
      formData.imageFiles.forEach((file, index) => {
        formDataForApi.append(`image_${index}`, file);
      });
      
      // Add field groups as JSON
      formDataForApi.append('fieldGroups', JSON.stringify(formData.fieldGroups));
      
      // Add sports
      formDataForApi.append('sports', JSON.stringify(formData.selectedSports.map(sport => sport.id)));
      
      // Add certificate
      formDataForApi.append('certificate', formData.certificateFile);
      
      // Add licenses
      formData.licenseFiles.forEach(license => {
        formDataForApi.append(`license_${license.sportId}`, license.file);
      });
      
      // Submit to API
      const response = await facilityService.createFacility(formDataForApi);
      
      if (response) {
        message.success('Tạo cơ sở thành công!');
        navigate('/owner/facility-management');
      }
    } catch (error) {
      console.error('Failed to create facility:', error);
      message.error('Không thể tạo cơ sở mới. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  // Render component based on current step directly
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/owner/facility-management')}
            type="text"
            size="large"
          />
          <Title level={2} style={{ margin: 0, marginLeft: 8 }}>Tạo cơ sở mới</Title>
        </div>

        <Card className="mb-8">
          <Steps current={current}>
            {steps.map((item, index) => (
              <Step 
                key={index}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </Steps>
        </Card>

        <div className="steps-content mb-8">
          <Card>
            {current === 0 && (
              <BasicInfoForm
                ref={basicInfoFormRef}
                formData={formData}
                updateFormData={updateFormData}
                allSports={allSports}
              />
            )}
            {current === 1 && (
              <ImagesUpload
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {current === 2 && (
              <FieldGroupsForm
                formData={formData}
                updateFormData={updateFormData}
                allSports={allSports}
              />
            )}
            {current === 3 && (
              <VerificationDocuments
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </Card>
        </div>

        <div className="steps-action flex justify-between">
          {current > 0 && (
            <Button 
              icon={<LeftOutlined />}
              onClick={prev}
              size="large"
            >
              Quay lại
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button 
              type="primary" 
              onClick={next}
              size="large"
              className="ml-auto"
            >
              Tiếp tục <RightOutlined />
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button 
              type="primary" 
              onClick={handleSubmit}
              loading={submitting}
              size="large"
              className="ml-auto"
              icon={<SaveOutlined />}
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFacility;
