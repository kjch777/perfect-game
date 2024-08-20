import { useSearchParams } from "react-router-dom";

export function TicketPaymentFailPage () {
  
  const [searchParams] = useSearchParams();
  
  return (
    <div className="box_section" style={{ width: "600px" }}>
      <img width="100px" src="https://static.toss.im/illusts/cross-red-spot.png" alt="Fail" />
      <h2>결제에 실패했어요</h2>
      <p>오류 메시지: {searchParams.get("message")}</p>
      <p>오류 코드: {searchParams.get("code")}</p>
    </div>
  );
}