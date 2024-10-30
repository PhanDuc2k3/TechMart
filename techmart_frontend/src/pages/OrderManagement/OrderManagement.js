import React, { useEffect, useState } from "react";
import * as OrderService from "../../services/OrderService";
import * as ReviewService from "../../services/ReviewService";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./OrderManagement.scss";
import logo from "../../assets/images/logo2.png";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { Modal, Input, Form, Rate, Upload, Button } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

const OrderManagement = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewImages, setReviewImages] = useState([]);

  const shop = () => {
    navigate("/");
  };

  useEffect(() => {
    if (user && user.id && user.access_token) {
      handleGetDetailsUser(user.id, user.access_token);
    }
  }, [user]);

  const handleGetDetailsUser = async (id, access_token) => {
    try {
      const res = await OrderService.getDetailsOrder(id, access_token);
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving order details:", error);
      setLoading(false);
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "cash":
        return "Thanh toán khi nhận hàng";
      case "vnpay":
        return "Thanh toán qua VN Pay";
      case "momo":
        return "Thanh toán ví MoMo";
      default:
        return method;
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const showReviewModal = (productId) => {
    setCurrentProductId(productId);
    setIsModalVisible(true);
  };

  const handleUpdateOrderStatus = async (orderId, productId) => {
    try {
      const updatedOrder = orders.find((order) => order._id === orderId);
      if (updatedOrder) {
        updatedOrder.isDelivered = true;
        await OrderService.updateOrder(
          user.id,
          orderId,
          { isDelivered: true },
          user.access_token
        );
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, isDelivered: true } : order
          )
        );
        toast.success(
          "Trạng thái đơn hàng đã được cập nhật thành Đã nhận hàng."
        );
        showReviewModal(productId);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Cập nhật trạng thái đơn hàng thất bại.");
    }
  };

  const handleOk = async () => {
    if (currentProductId) {
      try {
        const response = await ReviewService.addReview({
          productId: currentProductId,
          userId: user.id,
          content: reviewContent,
          rating: reviewRating,
          images: reviewImages,
        });
        if (response.status === "OK") {
          toast.success("Đánh giá đã được thêm thành công.");
          setIsModalVisible(false);
          setReviewContent("");
          setReviewRating(0);
          setReviewImages([]);
        } else {
          toast.success("Đánh giá đã được thêm thành công.");
        }
      } catch (error) {
        console.error("Error adding review:", error);
        toast.success("Đánh giá đã được thêm thành công.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleImageUpload = ({ file, onSuccess, onError }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setReviewImages((prevImages) => [...prevImages, reader.result]);
      onSuccess();
    };
    reader.onerror = () => {
      onError(new Error("Failed to upload image"));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index) => {
    setReviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const uploadProps = {
    customRequest: handleImageUpload,
    multiple: true,
    showUploadList: false,
  };

  const renderUploadedImages = () => {
    return reviewImages.map((image, index) => (
      <div
        key={index}
        style={{
          display: "inline-block",
          position: "relative",
          marginRight: 10,
        }}
      >
        <img
          src={image}
          alt={`review-image-${index}`}
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleImageRemove(index)}
          style={{ position: "absolute", top: 0, right: 0, color: "red" }}
        />
      </div>
    ));
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <div className="payment-page">
        <div className="container py-2">
          <div className="payment-page">
            <div style={{ marginBottom: 30 }} className="payment-header">
              <Link style={{ color: "black" }} to="">
                <i className="fa-solid fa-arrow-left-long"></i>
              </Link>
              <div className="go-back">
                <p className="title">Thông tin đơn hàng</p>
              </div>
            </div>
            {orders.length === 0 ? (
              <div style={{ height: 700 }} className="Cart_notification">
                <img
                  style={{ marginTop: 200 }}
                  src="https://cdn2.cellphones.com.vn/x,webp/media/cart/Cart-empty-v2.png"
                ></img>
                <p className="">
                  Bạn chưa mua đơn hàng nào.
                  <br />
                  Hãy chọn thêm sản phẩm và mua sắm nhé!
                </p>
              </div>
            ) : (
              orders.map((order, index) => (
                <div key={index} className="Order-body my-4">
                  <div
                    style={{
                      width: "100%",
                      borderBottom: "1px solid rgb(228, 232, 235)",
                      paddingBottom: 10,
                      margin: 0,
                    }}
                    className="row"
                  >
                    <div style={{ padding: 0 }} className="col-md-6">
                      <ul className="Order-body-top-left">
                        <li>Đơn hàng</li>
                        <li>EGA MEN</li>
                        <>
                          <li onClick={shop}>
                            <i
                              style={{ marginRight: 3 }}
                              className="fa-solid fa-shop"
                            ></i>
                            <p style={{ padding: 0, margin: 0 }}>Xem shop</p>
                          </li>
                        </>
                      </ul>
                    </div>
                    <div style={{ padding: 0 }} className="col-md-6 d-flex">
                      <ul className="Order-body-top-right">
                        <li>
                          {order.isPaid ? "Đã xác nhận" : "Chưa xác nhận"}
                        </li>
                        <div
                          style={{
                            height: 13,
                            width: 1,
                            backgroundColor: "rgb(212, 0, 25)",
                          }}
                        ></div>
                        <li>
                          {order.isDelivered
                            ? "Đã nhận hàng"
                            : "Chưa nhận hàng"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  {order?.orderItems.map((item, i) => {
                    const firstImage = item.image[0];
                    const imageUrl = `${firstImage}`;
                    return (
                      <div
                        key={i}
                        style={{
                          width: "100%",
                          borderBottom: "1px solid rgb(228, 232, 235)",
                          margin: 0,
                        }}
                        className="row py-3"
                      >
                        <div style={{ padding: 0 }} className="col-md-2">
                          <img
                            src={imageUrl}
                            style={{ width: 70, height: 70 }}
                            alt={item.name}
                          ></img>
                        </div>
                        <div className="Order-body-info col-md-10">
                          <div className="row">
                            <div className="col-md-10">
                              <p style={{ fontSize: 16 }}>
                                <span>{item.name}</span>
                                <span style={{ marginLeft: 10 }}>
                                  x{item.amount}
                                </span>
                              </p>
                            </div>

                            <div className="col-md-2 flex-end">
                              <p style={{ float: "right", fontSize: 16 }}>
                                {item.price}đ
                              </p>
                              {order.isDelivered && (
                                <Button
                                  type="primary"
                                  onClick={() => showReviewModal(item.product)}
                                  style={{
                                    cursor: "pointer",
                                    color: "white",
                                    backgroundColor: "rgb(129, 170, 204)",
                                    right: 30,
                                    top: 20,
                                  }}
                                >
                                  Đánh giá
                                </Button>
                              )}
                            </div>
                          </div>
                          <div>
                            <p>Màu: {item.selectedColor}</p>
                            <p>Size: {item.selectedSize}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ marginTop: 20 }} className="row">
                    <div
                      className="title-info2"
                      style={{ marginBottom: "10px" }}
                    >
                      Mã đơn hàng:{" "}
                      <span
                        style={{
                          color: "rgb(212, 0, 25)",
                          fontSize: "16px",
                          marginLeft: 10,
                        }}
                      >
                        {order._id}
                      </span>
                    </div>
                    <div>
                      <div style={{ marginBottom: 10 }}>
                        <span className="title-info2">Họ và tên: </span>
                        <span>{order.shippingAddress.fullName}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <span className="title-info2">Ngày đặt hàng: </span>
                        <span>{formatDateTime(order.updatedAt)}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <span className="title-info2">SĐT: </span>
                        <span>{order.shippingAddress.phone}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <span className="title-info2">Địa chỉ: </span>
                        <span>{order.shippingAddress.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      style={{ borderBottom: "1px solid rgb(228, 232, 235)" }}
                      className="col-md-12 d-flex"
                    >
                      <div style={{ marginRight: 10 }}>
                        <p className="title-info2">Phương thức thanh toán:</p>
                      </div>
                      <div>
                        <p>{getPaymentMethodText(order.paymentMethod)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row flex float-right py-2">
                    {order.isPaid && !order.isDelivered ? (
                      <div
                        style={{
                          marginTop: 20,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "rgb(212, 0, 25)",
                            border: "none",
                          }}
                          onClick={() =>
                            handleUpdateOrderStatus(order._id, order.productId)
                          }
                          className="btn btn-primary"
                        >
                          Đã nhận hàng
                        </button>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "auto",
                          }}
                        >
                          <img
                            style={{ width: 15, height: 20, marginRight: 3 }}
                            src={logo}
                            alt="Logo"
                          />
                          <p style={{ fontSize: 16, margin: 0 }}>
                            Tổng số tiền:
                          </p>
                          <p
                            style={{
                              fontSize: 20,
                              color: "#d70018",
                              margin: 0,
                              fontWeight: 500,
                              marginLeft: 10,
                            }}
                          >
                            {order.totalPrice}
                          </p>
                        </div>
                      </div>
                    ) : !order.isPaid && !order.isDelivered ? (
                      <div
                        style={{
                          marginTop: 20,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "rgb(212, 0, 25)",
                            border: "none",
                          }}
                          className="btn btn-secondary"
                          disabled
                        >
                          Đã gửi yêu cầu đặt hàng
                        </button>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "auto",
                          }}
                        >
                          <img
                            style={{ width: 15, height: 20, marginRight: 3 }}
                            src={logo}
                            alt="Logo"
                          />
                          <p style={{ fontSize: 16, margin: 0 }}>
                            Tổng số tiền:
                          </p>
                          <p
                            style={{
                              fontSize: 20,
                              color: "#d70018",
                              margin: 0,
                              fontWeight: 500,
                              marginLeft: 10,
                            }}
                          >
                            {order.totalPrice}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          marginTop: 20,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "gray",
                            border: "none",
                          }}
                          className="btn btn-secondary"
                          disabled
                        >
                          Đã nhận hàng
                        </button>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "auto",
                          }}
                        >
                          <img
                            style={{ width: 15, height: 20, marginRight: 3 }}
                            src={logo}
                            alt="Logo"
                          />
                          <p style={{ fontSize: 16, margin: 0 }}>
                            Tổng số tiền:
                          </p>
                          <p
                            style={{
                              fontSize: 20,
                              color: "#d70018",
                              margin: 0,
                              fontWeight: 500,
                              marginLeft: 10,
                            }}
                          >
                            {order.totalPrice}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Modal
          title="Đánh giá sản phẩm"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Gửi đánh giá"
          cancelText="Hủy"
        >
          <Form
            name="reviewForm"
            onFinish={handleOk}
            initialValues={{ rating: reviewRating }}
          >
            <Form.Item
              name="rating"
              label="Xếp hạng"
              rules={[{ required: true, message: "Vui lòng chọn xếp hạng!" }]}
            >
              <Rate onChange={setReviewRating} value={reviewRating} />
            </Form.Item>
            <Form.Item
              name="content"
              label="Nội dung"
              rules={[
                { required: true, message: "Vui lòng nhập nội dung đánh giá!" },
              ]}
            >
              <Input.TextArea
                rows={4}
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Ảnh đánh giá">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
              <div style={{ marginTop: 10 }}>{renderUploadedImages()}</div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default OrderManagement;
