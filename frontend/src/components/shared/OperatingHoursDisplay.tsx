import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';

interface OperatingHoursDisplayProps {
  facility: {
    openTime1: string | null;
    closeTime1: string | null;
    openTime2: string | null;
    closeTime2: string | null;
    openTime3: string | null;
    closeTime3: string | null;
    numberOfShifts?: number;
  };
  showIcon?: boolean;
  className?: string;
}

const OperatingHoursDisplay: React.FC<OperatingHoursDisplayProps> = ({
  facility,
  showIcon = false,
  className = ''
}) => {
  // Format time string from "HH:MM:SS" to "HH:MM"
  const formatTime = (timeStr: string | null): string => {
    if (!timeStr) return '';
    return timeStr.substring(0, 5);
  };

  // Generate operating hours text
  const getOperatingHoursText = (): JSX.Element[] => {
    const shifts: JSX.Element[] = [];
    
    if (facility.openTime1 && facility.closeTime1) {
      shifts.push(
        <span key="shift1" className={className}>
          {showIcon && <ClockCircleOutlined className="mr-1" />}
          {formatTime(facility.openTime1)} - {formatTime(facility.closeTime1)}
        </span>
      );
    }
    
    if (facility.openTime2 && facility.closeTime2) {
      shifts.push(
        <span key="shift2" className={className}>
          {shifts.length > 0 && <span className="mx-2">|</span>}
          {showIcon && <ClockCircleOutlined className="mr-1" />}
          {formatTime(facility.openTime2)} - {formatTime(facility.closeTime2)}
        </span>
      );
    }
    
    if (facility.openTime3 && facility.closeTime3) {
      shifts.push(
        <span key="shift3" className={className}>
          {shifts.length > 0 && <span className="mx-2">|</span>}
          {showIcon && <ClockCircleOutlined className="mr-1" />}
          {formatTime(facility.openTime3)} - {formatTime(facility.closeTime3)}
        </span>
      );
    }
    
    return shifts;
  };

  return (
    <div className="operating-hours">
      <div className="flex flex-wrap items-center">
        {getOperatingHoursText()}
      </div>
    </div>
  );
};

export default OperatingHoursDisplay; 