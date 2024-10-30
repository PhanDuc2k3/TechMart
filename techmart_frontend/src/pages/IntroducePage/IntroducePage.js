import React from "react";
import { Link } from "react-router-dom";
import "./IntroducePage.scss";

const IntroducePage = () => {
  return (
    <div className="container px-4 form-policy">
      <div class="signup_header">
        <Link className="link-homepage" to="/">
          Trang chủ
        </Link>
        <p>/</p>
        <p style={{ color: "rgb(191, 191, 191)" }}>Giới thiệu</p>
      </div>

      <h1 style={{ marginTop: "1px", fontSize: "30px", fontWeight: "400" }}>
        Giới thiệu
      </h1>

      <div className="form-policy-second">
        <p>
          Chào mừng bạn đến với TechWeb - điểm đến lý tưởng cho những ai
          yêu thích về các đồ chơi công nghệ. Chúng tôi tự hào mang đến cho bạn
          những sản phẩm cao cấp, chất lượng, phù hợp với nhu cầu của người dùng.
        </p>
      </div>

      <div className="form-policy-second">
        <h2>1. Sứ mệnh của chúng tôi</h2>
        <p>
          Tại TechWeb, sứ mệnh của chúng tôi là cung cấp những sản phẩm
          chất lượng cao với giá cả hợp lý. Chúng tôi luôn cập nhật
          những sản phẩm mới nhất, đảm bảo rằng bạn sẽ luôn có những
          lựa chọn thiết bị công nghệ phù hợp với phong cách và cá tính của mình.
        </p>
      </div>

      <div className="form-policy-second">
        <h2>2. Đội ngũ thực hiện</h2>
        <p>
          Chúng tôi tự hào với đội ngũ làm việc tận tâm và giàu kinh nghiệm.
          Những người sáng lập và phát triển bao gồm:
          <ul>
            <li>Phan Minh Đức</li>
            <li>Bùi Hữu Đạt</li>
            <li>Trần Anh Chiến</li>
          </ul>
          Dưới đây là nội dung đã được điều chỉnh để phù hợp với sản phẩm đồ chơi công nghệ:

---

Chúng tôi cung cấp một loạt các sản phẩm đồ chơi công nghệ bao gồm thiết bị thông minh, tai nghe, loa, đồng hồ thông minh và nhiều phụ kiện độc đáo khác. Mỗi sản phẩm đều được chọn lọc kỹ càng, từ chất liệu đến tính năng, nhằm mang lại sự tiện ích và trải nghiệm công nghệ đỉnh cao cho người dùng. Hãy cùng Công Nghệ TechWeb khám phá thế giới đồ chơi công nghệ đầy sáng tạo và hiện đại. Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tuyệt vời nhất!
        </p>
      </div>
    </div>
  );
};

export default IntroducePage;
