import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginContext from '../Login/LoginContext';
import "../../css/GoodsOrder.css";

const GoodsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, quantity, totalPrice } = location.state || {};
  const { loginMember } = useContext(LoginContext);

  const [orderData, setOrderData] = useState(location.state || {});
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  useEffect(() => {
    if (!orderData.item) {
      navigate('/goods');
    } else {
      if (loginMember) {
        setAddress(loginMember.memberAddress);
        setAddressDetail(loginMember.memberAddressDetail);
      }
    }
  }, [orderData, loginMember, navigate]);

  
  //결제하기 버튼 기능
  const handlePayment = async () => {
    try {
      if (!loginMember) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
        return;
      }

      const updatedOrderData = {
        ...orderData,
        goodsId:item.goodsId,
        amount: totalPrice,
        orderName: `${item.goodsName} x ${quantity}`,
        quantity,
        customer: {
          id:loginMember.memberId,
          name: loginMember.memberName,
          email: loginMember.memberEmail,
          phone: loginMember.memberPhone,
        },
      };
      navigate('/payment/checkout', { state: updatedOrderData });
    } catch (err) {
      console.error('Payment initiation error:', err);
      setError(err.message || 'Payment initiation failed.');
    }
  };

  //주소 변경하기 기능
  const handleAddressUpdate = async () => {
    try {
      const response = await fetch('/goods/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...loginMember,
          memberAddress: address,
          memberAddressDetail: addressDetail,
        }),
      });

      if (response.ok) {
        alert('주소가 성공적으로 업데이트되었습니다.');
      } else {
        throw new Error('주소 업데이트 실패');
      }
    } catch (err) {
      console.error('Address update error:', err);
      setError(err.message || 'Address update failed.');
    }
  };

  //주소 찾기 기능
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        setAddress(data.address);
        setAddressDetail('');
      }
    }).open();
  };

  if (!orderData.item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="goodsOrder-container mt-5">
      <h2>주문 페이지</h2>

      <div className="goodsOrder-card-container">
        {/* 주문자 정보 카드 */}
        <div className="order-card order-member-info card-content-item">
          <div className="goodsOrder-card-header">주문자 정보</div>
          {loginMember ? (
            <div className="order-card-content member-info-details">
              <table className="order-member-info-table">
                <tbody>
                  <tr>
                    <td className="order-member-info-label">이름:</td>
                    <td className="order-member-info-value">{loginMember.memberName}</td>
                  </tr>
                  <tr>
                    <td className="order-member-info-label">전화번호:</td>
                    <td className="order-member-info-value">{loginMember.memberPhone}</td>
                  </tr>
                  <tr>
                    <td className="order-member-info-label">이메일:</td>
                    <td className="order-member-info-value">{loginMember.memberEmail}</td>
                  </tr>
                  <tr>
                    <td className="order-member-info-label">배송지 주소:</td>
                    <td>
                      <input
                        type="text"
                        className="order-form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="주소를 입력하거나 검색 버튼을 눌러주세요"
                      />
                      <button onClick={handleAddressSearch} className='search-address-button'>
                        주소 검색
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="order-member-info-label">상세 주소:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        placeholder="상세 주소를 입력해주세요"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button onClick={handleAddressUpdate} className='update-address-button'>
                        주소 변경하기
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>로그인 정보를 불러올 수 없습니다.</p>
          )}
        </div>

        {/* 상품 정보 카드 */}
        <div className="card order-details card-content-item">
          <div className="goodsOrder-card-header">주문상품 정보</div>
          <div className="order-goods-details">
            <div className='order-image'>
              <img
                src={`/images/${item.goodsImage}`}
                className="order-details-img"
                alt={item.goodsName}
              />
            </div>
            <div className="order-details-info">
              <h4>{item.goodsName}</h4>
              <p>수량: {quantity}</p>
              <p>결제 금액: {totalPrice.toLocaleString()}원</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button onClick={handlePayment} className='goods-pay-button'>결제하기</button> 
      </div>
    </div>
  );
};

export default GoodsOrder;
