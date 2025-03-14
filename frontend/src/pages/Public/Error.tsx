import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
      <h1 className="text-2xl font-bold text-red-500">
        Trang này không tồn tại
      </h1>
      <div className="group">
        <button className="rounded-lg border-b-8 bg-blue-700 border-blue-700 group-hover:border-b-0 group-hover:border-t-8 transition-all duration-150">
          <div
            onClick={handleNavigate}
            className="px-5 py-3 bg-blue-500 text-white rounded-lg group-hover:bg-blue-700 duration-150"
          >
            Ấn vào đây để trở về trang chủ
          </div>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
