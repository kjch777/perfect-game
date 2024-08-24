import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function PaymentFailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");

  useEffect(() => {
    console.error(`결제 실패: ${errorCode} - ${errorMessage}`);
  }, [errorCode, errorMessage]);


  return (
    <div className="box_section" style={{ width: "600px" }}>
      <img width="100px" src="https://static.toss.im/illusts/cross-red-spot.png" alt="Fail" />
      <h2>결제에 실패했어요</h2>
      <p>오류 메시지: {searchParams.get("message")}</p>
      <p>오류 코드: {searchParams.get("code")}</p>
      <button onClick={() => navigate('/goods')}>메인으로 돌아가기</button>
    </div>
  );
}
export default PaymentFailPage;
