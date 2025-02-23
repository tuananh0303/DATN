import React from 'react';

interface Review {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  fieldFacility: string;
}

interface ReviewListProps {
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 5,
    comment: "Chất lượng",
    createdAt: "14/07/2024",
    fieldFacility: "sân A/ sân cầu lông Phạm Kha"
  },
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 4,
    comment: "Tuyệt vời",
    createdAt: "14/07/2024",
    fieldFacility: "sân I/ sân cầu lông Phạm Kha"
  },
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 5,
    comment: "Sân tốt",
    createdAt: "14/07/2024",
    fieldFacility: "sân I/ sân cầu lông Phạm Kha"
  },
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 4,
    comment: "aaaaaa",
    createdAt: "14/07/2024",
    fieldFacility: "sân I/ sân cầu lông Phạm Kha"
  },
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 3,
    comment: "aaaaaa",
    createdAt: "14/07/2024",
    fieldFacility: "sân I/ sân cầu lông Phạm Kha"
  },
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 2,
    comment: "aaaaaaaaa",
    createdAt: "14/07/2024",
    fieldFacility: "sân I/ sân cầu lông Phạm Kha"
  },
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 1,
    comment: "Tệ quá",
    createdAt: "14/07/2024",
    fieldFacility: "sân I/ sân cầu lông Phạm Kha"
  },
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 5,
    comment: "Chất lượng tốt",
    createdAt: "14/07/2024",
    fieldFacility: "sân I/ sân cầu lông Phạm Kha"
  }
];

const ReviewList: React.FC<ReviewListProps> = ({ reviews = defaultReviews }) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1090px',
      minHeight: '495px',
      backgroundColor: '#fdfdfd',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '25px 20px',
        backgroundColor: '#448ff0b2',
        borderWidth: '1px',
        borderColor: '#979797',
        borderStyle: 'solid',
        fontFamily: 'Open Sans',
        fontWeight: 700,
        fontSize: '15px',
        color: '#000000',
      }}>
        <div style={{ flex: '1 0 125px' }}>User Name</div>
        <div style={{ flex: '1 0 50px', marginLeft: '15px' }}>Rating</div>
        <div style={{ flex: '1 0 185px', marginLeft: '45px' }}>Comment</div>
        <div style={{ flex: '1 0 95px', marginLeft: '45px' }}>Created_At</div>
        <div style={{ flex: '1 0 265px', marginLeft: '45px' }}>Field/Facility</div>
        <div style={{ flex: '1 0 49px', marginLeft: '45px' }}>Action</div>
      </div>

      {/* Review Rows */}
      {reviews.map((review, index) => (
        <div key={index} style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '14px 20px',
          backgroundColor: '#ffffff',
          borderWidth: '1px',
          borderColor: '#979797',
          borderStyle: 'solid',
          fontFamily: 'Open Sans',
          fontWeight: 600,
          fontSize: '14px',
          color: '#000000',
        }}>
          <div style={{ flex: '1 0 121px' }}>{review.userName}</div>
          <div style={{ flex: '1 0 9px', marginLeft: '76px' }}>{review.rating}</div>
          <div style={{ flex: '1 0 170px', marginLeft: '101px' }}>{review.comment}</div>
          <div style={{ flex: '1 0 76px', marginLeft: '159px' }}>{review.createdAt}</div>
          <div style={{ flex: '1 0 220px', marginLeft: '141px' }}>{review.fieldFacility}</div>
          <div style={{
            flex: '1 0 48px',
            height: '32px',
            backgroundColor: '#fafbfd',
            borderRadius: '8px',
            borderWidth: '0.6px',
            borderColor: '#d5d5d5',
            borderStyle: 'solid',
            marginLeft: '65px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/error.png" 
              alt="action"
              style={{
                width: '16px',
                height: '16px'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

