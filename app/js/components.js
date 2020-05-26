const components = {
    signIn: `<section class="form-sign-in-container">
    <form class="form-sign-in">
        <h1>Đăng Nhập</h1>
        <div class="txtb">
            <input type="email" name="email" placeholder="Email">
            <span></span>
            <div class="alert-error" id="email-error"></div>
        </div>
        <div class="txtb">
            <input type="password" name = "password" placeholder="Mật khẩu">
            <span></span>
            <div class="alert-error" id="passWord-error"></div>
        </div>
        <button id="btn-sign-in"  class="logbtn" type="submit">Đăng nhập</button>
        <div class="bottom-in">
            Bạn chưa có tài khoản?<a id= "aSignIn"href="#"> Đăng kí</a>
        </div>
        <div class="social-media">
            <ul>
                <li id="fbnek"><img src="img/FbIcon.png"></li>
                <li id="googlenek"><img src="img/googleIcon.png"></li>
                <li id="phonenek"><img src="img/phoneIcon.png"></li>
                <li id="githubnek"><img src="img/githubIcon.png"></li>
            </ul>
        </div>
    </form>
</section>`,
    signUp: `<section class="form-sign-up-container">
    <form class="form-sign-up">
        <h1>Đăng Kí</h1>
        <div id ="form-input-signup-wrapper">
        <div class="txtbup">
            <input type="text" name="fullName" placeholder="Họ tên">
            <span></span>
            <div class="alert-error" id="fullName-error"></div>
            
        </div>
        <div class="txtbup">
            <input type="email" name="email" placeholder="Email">
            <span></span>
            <div class="alert-error" id="email-error"></div>
        </div>
        <div class="txtbup">
            <input type="password" name="password" placeholder="Mật khẩu">
            <span></span>
            <div class="alert-error" id="passWord-error"></div>
        </div>
        <div class="txtbup">
            <input type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu">
            <div class="alert-error" id="confirmPassWord-error"></div>
            <div class="alert-success" id="sign-up-success"></div>
            <span></span>
            
        </div>
        </div>
        <button id="btn-sign-up" class="logbtn" type="submit" ></button>
        <div class="bottom-up">
            Bạn đã có tài khoản?<a id="aSignUp" href="#"> Đăng Nhập</a>
        </div>
        <div class="social-media social-media-up">
            <ul>
            <li id="fbnek"><img src="img/FbIcon.png"></li>
            <li id="googlenek"><img src="img/googleIcon.png"></li>
            <li id="phonenek"><img src="img/phoneIcon.png"></li>
            <li id="githubnek"><img src="img/githubIcon.png"></li>
            </ul>
        </div>
    </form>
</section>`,
    home: `    <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
    <div class="container-fluid">
        <a class="navbar-branch mr-4" href="#" onclick="utils.showHomeWhenClickOnLogo()">
            <img height="45px" src="./img/logo.JPG" style="border-radius: 50%;">
            Where to go</a>
        <form class="form-inline input-nav searchPlace" action="/action_page.php">
            <input class="form-control mr-sm-2" type="text" name="search" placeholder="Tìm kiếm">
            <button id="search-icon" class="btn btn-outline-light" type="submit"> <i class="fas fa-search"></i>
            </button>
        </form>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link active" onclick="view.showScreen('home')" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link go-to-chat" href="#" >Chat</a>
                </li>
                <li class="nav-item mr-4">
                    <a class="nav-link" href="#">Team</a>
                </li>
                <li class="nav-item">
                    <a id="dangNhapChange" class="nav-link pr-0" href="#">Đăng Nhập</a>
                </li>
                <li class="nav-item">
                    <a id="dangKyChange" class="nav-link" href="#">Đăng Ký</a>
                </li>

            </ul>
        </div>
    </div>
</nav>
<section id="body-home-nek">
    <!-- XXX  body  XXX -->
    <!-- banner introduce -->
    <div id="demo" class="carousel slide" data-ride="carousel">

        <ul class="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" class="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
        </ul>


        <div class="carousel-inner">
            <div class="carousel-item active">
                <img style="width: 100%; " src="./img/select1.JPG" alt="Sập Mẹ Web r">

            </div>
            <div class="carousel-item">
                <img style="width: 100%;height: auto;" src="./img/banner11.JPG" alt="Sập Mẹ Web r">
            </div>
            <div class="carousel-item">
                <img style="width: 100%;height: auto;" src="./img/select2.JPG" alt="Sập Mẹ Web r">
            </div>
        </div>


        <a class="carousel-control-prev" href="#demo" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>
    </div>
    <!-- form input content -->
    <div class="container">
        <h2>Bạn có địa điểm nào mới</h2>
        <p>Hãy chia sẻ cho mọi người nhé!</p>
        <form id="form-input-user-wrapper" class="row">
            <div class="left-input-user-wrapper col-md-6 col-12">
                <div class="input-group input-group-sm bbbx">
                    <div class="input-group-prepend">
                        <p>Tên:</p>
                    </div>
                    <input type="text" name="title" class="form-control">
                </div>
                <span></span>
                <div class="input-group input-group-sm bbbx">
                    <div class="input-group-prepend">
                        <p>Đia Chỉ:</p>
                    </div>
                    <input type="text" name="address" class="form-control">
                </div>
                <span></span>
                <span></span>               
                <span></span>
                <div class="input-group input-group-sm bbbx">
                    <div class="input-group-prepend">
                        <p>Thể Loại:</p>
                    </div>
                    <input type="text" name="type" class="form-control hashTag"">
            </div>
            <span></span>
            <div class=" input-tag" style="width: fit-content;">
                    <a class="club">Buổi tối</a>
                    <a class="nightlife">Buổi sáng</a>
                    <a class="night">Buổi Trưa</a>
                    <a class="noon">Ăn uống</a>
                    <a class="morning">Giải trí</a>
                    <a class="fun">Phim</a>
                    <a class="night">Hẹn hò</a>
                    <a class="noon">Ngoài trời</a>
                    <a class="morning">Trong nhà</a>
                    <a class="fun">club</a>
                </div>
            </div>
            <div class="right-input-user-wrapper col-md-6 col-12">
                <label for="comment">Content:</label>
                <textarea class="form-control" rows="5" id="comment" name="content"></textarea>
                <!-- <i onclick="triggerUploadFile()" class="far fa-paperclip">Thêm Ảnh</i> -->
                <input type="file" class="upLoad-file btn" style=" margin-top: 10px;" multiple name="ChooseFile"
                    id="" placeholder="Thêm Ảnh">
            </div>
            <div style="width: 100%;display: flex;justify-content: flex-end;margin-right: 40px;">
                <button class="btn " id="zxcvb"
                    style="border-radius: 20px;padding-bottom: 0px;padding-top: 0px;height: 38px;color:white;"
                    type="submit">Đăng</button>
            </div>
        </form>
    </div>
    <section class="container mt-4">
    <div id="demo1" class="carousel slide" data-ride="carousel">
        <ul id="tyu" class="carousel-indicators">
        </ul>
        <div id="showDataConfirmed" class="carousel-inner">
        </div>
        <a style="height:300px;" class="carousel-control-prev" href="#demo1" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        </a>
      <a style="height:300px;" class="carousel-control-next" href="#demo1" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>
    
  </section>
    <!-- select to show -->
    <div id="demo2" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ul class="carousel-indicators">
            <li data-target="#demo2" data-slide-to="0" class="active"></li>
            <li data-target="#demo2" data-slide-to="1"></li>
            <li data-target="#demo2" data-slide-to="2"></li>
        </ul>

        <!-- The slideshow -->
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img style="width: 100%;opacity: 0.7;" src="./img/anha3.jpg" alt="">
            </div>
            <div class="carousel-item">
                <img style="width: 100%;opacity: 0.7;" src="./img/anha2.jpg" alt="">
            </div>
            <div class="carousel-item">
                <img style="width: 100%;opacity: 0.7;" src="./img/anha1.jpg" alt="">
            </div>
        </div>

        <!-- Left and right controls -->
        <a class="carousel-control-prev" href="#demo2" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo2" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>
        <div class="option-wrapper">
            <div class="left-option-wrapper">
                <div class="left-option-wrapper-content">
                    <p class="title-nek">Danh sách các địa điểm</p>
                    <span class="content-nek">Bạn đang phân vân không biết nên đi chơi ở đâu?
Hãy để Where To Go gợi ý cho bạn những địa điểm thú vị quanh Hà Nội
 
</span>
                    <a id="kham-pha-ben-trai"><button type="button" class="btn btn-primary btn-lg ">Khám
                            Phá</button></a>
                </div>
            </div>
            <div class="right-option-wrapper">
                <div class="right-option-wrapper-content">
                    <p class="title-nek">Các tour quanh Hà Nội</p>
                    <span class="content-nek">Nơi tập hợp các tour du lịch mới mẻ mà bạn nên đi cùng bạn bè
Hãy để Where To Go gợi ý cho bạn những địa điểm thú vị quanh Hà Nội
                    </span>
                    <button type="button" id="kham-pha-ben-phai" class="btn btn-primary btn-lg">Khám Phá</button>
                </div>
            </div>
        </div>
    </div>
    <!-- show infomation of HaNoi -->
    <div class="container thong-tin-noi-bat">
        <h2>Thông tin nổi bật</h2>
        <h4>Những thông tin mới nhất về Hà Nội</h4>

        <div class="container mt-4">
            <div id="demo1" class="carousel slide" data-ride="carousel">

                <ul class="carousel-indicators">
                    <li data-target="#demo1" data-slide-to="0" class="active"></li>
                    <li data-target="#demo1" data-slide-to="1"></li>
                </ul>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://dulichvietnam.com.vn/5-dieu-nhat-dinh-phai-lam-de-cam-nhan-ve-dep-ha-noi-sang-som.html"
                                            title="5 điều nhất định phải làm để cảm nhận vẻ đẹp Hà Nội sáng sớm">
                                            <img src="https://dulichvietnam.com.vn/data/ha-noi-sang-som-8.jpg"
                                                class="rounded"
                                                alt="5 điều nhất định phải làm để cảm nhận vẻ đẹp Hà Nội sáng sớm">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">
                                            Hà Nội
                                        </button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://dulichvietnam.com.vn/5-dieu-nhat-dinh-phai-lam-de-cam-nhan-ve-dep-ha-noi-sang-som.html">
                                            5 điều nhất định phải làm để cảm nhận vẻ đẹp Hà Nội sáng sớm
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://zingnews.vn/50-khoanh-khac-dang-yeu-cua-ha-noi-post882074.html"
                                            title="50 khoảnh khắc đáng yêu của Hà Nội">
                                            <img src="https://znews-photo.zadn.vn/w860/Uploaded/lerl/2018_10_05/_HTV138400.jpg"
                                                class="rounded" alt="50 khoảnh khắc đáng yêu của Hà Nội">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Hà Nội</button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://zingnews.vn/50-khoanh-khac-dang-yeu-cua-ha-noi-post882074.html">
                                            50 khoảnh khắc đáng yêu của thủ đô Hà Nội
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://mytour.vn/location/13721-cac-hot-instagram-goi-y-nhung-dia-diem-check-in-da-dep-lai-con-free-o-ha-noi.html"
                                            title="Các Hot Instagram Gợi Ý Những Địa Điểm Check In Đã Đẹp Lại Còn Free Ở Hà Nội">
                                            <img src="https://lh5.googleusercontent.com/kIXHA46vhk0mE7Lg5J3dAe0NKoj1qmV9LQy_IL5nBevT3yh22bOZcPara5cUAuuNYuqh2pDnyWyVLqQssEagn111Uxi_Hbr9Ln_NcapO5wEAmmoc1C5o4WxP4IDBrS__IxwUTyMz"
                                                class="rounded"
                                                alt="Các Hot Instagram Gợi Ý Những Địa Điểm Check In Đã Đẹp Lại Còn Free Ở Hà Nội">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Hà Nội</button>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Checkin</button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://mytour.vn/location/13721-cac-hot-instagram-goi-y-nhung-dia-diem-check-in-da-dep-lai-con-free-o-ha-noi.html">
                                            Các Hot Instagram Gợi Ý Những Địa Điểm Check In Đã Đẹp Lại Còn Free Ở Hà
                                            Nội
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://saostar.vn/xa-hoi/co-mot-ha-noi-binh-yen-va-gan-gui-trong-mat-ban-be-quoc-te-4684508.html"
                                            title="Có một Hà Nội bình yên và gần gũi trong mắt bạn bè quốc tế">
                                            <img src="https://ss-images.catscdn.vn/wp660/2019/03/01/4684508/cf-giang-4_euzt.jpg"
                                                class="rounded"
                                                alt="Có một Hà Nội bình yên và gần gũi trong mắt bạn bè quốc tế">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Hà Nội</button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://saostar.vn/xa-hoi/co-mot-ha-noi-binh-yen-va-gan-gui-trong-mat-ban-be-quoc-te-4684508.html">
                                            Có một Hà Nội bình yên và gần gũi trong mắt bạn bè quốc tế
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://dulichvietnam.com.vn/5-dieu-nhat-dinh-phai-lam-de-cam-nhan-ve-dep-ha-noi-sang-som.html"
                                            title="5 điều nhất định phải làm để cảm nhận vẻ đẹp Hà Nội sáng sớm">
                                            <img src="https://dulichvietnam.com.vn/data/ha-noi-sang-som-8.jpg"
                                                class="rounded"
                                                alt="5 điều nhất định phải làm để cảm nhận vẻ đẹp Hà Nội sáng sớm">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">
                                            Hà Nội
                                        </button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://dulichvietnam.com.vn/5-dieu-nhat-dinh-phai-lam-de-cam-nhan-ve-dep-ha-noi-sang-som.html">
                                            5 điều nhất định phải làm để cảm nhận vẻ đẹp Hà Nội sáng sớm
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://zingnews.vn/50-khoanh-khac-dang-yeu-cua-ha-noi-post882074.html"
                                            title="50 khoảnh khắc đáng yêu của Hà Nội">
                                            <img src="https://znews-photo.zadn.vn/w860/Uploaded/lerl/2018_10_05/_HTV138400.jpg"
                                                class="rounded" alt="50 khoảnh khắc đáng yêu của Hà Nội">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Hà Nội</button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://zingnews.vn/50-khoanh-khac-dang-yeu-cua-ha-noi-post882074.html">
                                            50 khoảnh khắc đáng yêu của thủ đô Hà Nội
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://mytour.vn/location/13721-cac-hot-instagram-goi-y-nhung-dia-diem-check-in-da-dep-lai-con-free-o-ha-noi.html"
                                            title="Các Hot Instagram Gợi Ý Những Địa Điểm Check In Đã Đẹp Lại Còn Free Ở Hà Nội">
                                            <img src="https://lh5.googleusercontent.com/kIXHA46vhk0mE7Lg5J3dAe0NKoj1qmV9LQy_IL5nBevT3yh22bOZcPara5cUAuuNYuqh2pDnyWyVLqQssEagn111Uxi_Hbr9Ln_NcapO5wEAmmoc1C5o4WxP4IDBrS__IxwUTyMz"
                                                class="rounded"
                                                alt="Các Hot Instagram Gợi Ý Những Địa Điểm Check In Đã Đẹp Lại Còn Free Ở Hà Nội">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Hà Nội</button>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Checkin</button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://mytour.vn/location/13721-cac-hot-instagram-goi-y-nhung-dia-diem-check-in-da-dep-lai-con-free-o-ha-noi.html">
                                            Các Hot Instagram Gợi Ý Những Địa Điểm Check In Đã Đẹp Lại Còn Free Ở Hà
                                            Nội
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6">
                                <form class="form-item-nhd">
                                    <div class="text-center nhd">
                                        <a href="https://saostar.vn/xa-hoi/co-mot-ha-noi-binh-yen-va-gan-gui-trong-mat-ban-be-quoc-te-4684508.html"
                                            title="Có một Hà Nội bình yên và gần gũi trong mắt bạn bè quốc tế">
                                            <img src="https://ss-images.catscdn.vn/wp660/2019/03/01/4684508/cf-giang-4_euzt.jpg"
                                                class="rounded"
                                                alt="Có một Hà Nội bình yên và gần gũi trong mắt bạn bè quốc tế">
                                        </a>
                                    </div>
                                    <div class="hashtag-nhd">
                                        <button type="button" class="btn btn-primary btn-sm">Hà Nội</button>
                                    </div>
                                    <h5 class="content-nhd">
                                        <a
                                            href="https://saostar.vn/xa-hoi/co-mot-ha-noi-binh-yen-va-gan-gui-trong-mat-ban-be-quoc-te-4684508.html">
                                            Có một Hà Nội bình yên và gần gũi trong mắt bạn bè quốc tế
                                        </a>
                                    </h5>
                                    <div class="view-nhd">
                                        <div class="rate-nhd">
                                            <i class="fas fa-star" style="color: #fbfb02e3;"></i>
                                            <span class="start-nhd">0.0</span>
                                            /
                                            <span class="finish-nhd">5.0</span>
                                        </div>
                                        <div class="like-nhd">
                                            <i class="far fa-thumbs-up" style="color: #1313aad9;"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#demo1" data-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#demo1" data-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </a>
            </div>
        </div>
    </div>
    </section>
    <section class="chat-container">
    <div class="current-conversation">
        <div class="aside-top">
    
            <div class=" btn-leave-conversation-wrapper" onclick='utils.chatClose()'>
                <button><i class="far fa-times  btn-icon" id="btn-leave-conversation"></i> </button>
    
            </div>
            <div class="details-current-conversation">
                Nguyencuong21520@gmail.com
            </div>
        </div>
        <div class="list-message-chat">
               
            </div>
            <form class="form-add-message-chat">
                <div class="input-wrapper">
                    <input type="text" name="message" placeholder="Nhập tin nhắn...">
                </div>
                <button id="aaa" type="submit"><i class="fas fa-paper-plane" style="color: rgb(4, 88, 167);"></i></button>
            </form>
    </div>
    </section>
<!--XXX footer XXX-->
<footer style="
margin-top: 50px;
">
    <div class="container-fluid padding">
        <div class="row text-center">
            <div class="col-md-5">
                <hr class="light">
                <h5>Team</h5>
                <hr class="light">
                <p>Nguyễn Văn Cường</p>
                <p>Nguyễn Hồng Hà</p>
                <p>Phùng Minh Huyền</p>
                <p>Nguyễn Hữu Đức</p>
            </div>
            <div class="col-md-2">
                <img height="200px" style="padding-top: 20px;" src="./img/logo.JPG">
            </div>
            <div class="col-md-5">
                <hr class="light">
                <h5>Liên Hệ</h5>
                <hr class="light">
                <p>wtgmindx@gmail.com</p>
                <p>Hanoi, Vietnam</p>
                <p>0374523912</p>
                <div class="social-media">
                    <ul>
                        <a href="#">
                            <li id="fbnek"><img src="img/FbIcon.png"></li>
                        </a>
                        <a href="https://www.instagram.com/hnoiwtg/?igshid=hzd5espr5g6l&fbclid=IwAR0pmP8djxiH1jueiYgS-Z2PYa_fCUSNhwbfkA2-vmUQJjm9lduNZ3rrQK8">
                            <li id="googlenek"><img src="./img/instagram.png"></li>
                        </a>
                        <a>
                            <li id="phonenek"><img src="img/messenger.png"></li>
                        </a>
                        <a>
                            <li id="githubnek"><img src="img/zalo.png"></li>
                        </a>
                    </ul>
                </div>
            </div>
            <div class="col-12">
                <hr class="light-80">
                <h5>&copy; Where to go!</h5>
            </div>
        </div>
    </div>
</footer>`,
    menu: `<div style="margin-top: 20px;" class="container container-card">
<h1 style="text-align: center; margin-bottom:20px;">Danh sách các địa điểm vui chơi</h1>
<div id="cacdeck" class="row asd">
</div>
<div id="showListSelected" class="alert alert-success" style="right: 10px;position: fixed;">
    <strong><i class="fad fa-cart-plus"></i>  <span id="countCard"></span></strong> Hãy tới <a href="place.html" class="alert-link">trang ramdom </a>.  <strong onclick="controller.resetCart()"><i class="fad fa-trash-alt"></i></strong>
  </div>
  <div id ="next-pre-page" style = "display: flex; justify-content: center; " >

    </div>
</div> `,
    tour: `<section style="margin-top: 20px;" class="container container-card">
<h2 style="text-align: center;">Các Tour Du Lịch Trong Ngày</h2>
<div class="tour-deck">
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Du Lịch Hà Nội</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://www.vietfuntravel.com.vn/image/cache/data/hanoi/hanoi_/1284430849_chua1cot-cr-466x310.jpg">
            <div class="tour-body">
                <h5>Điạ chỉ: Hà Nội</h5>
                <h5>Thời gian: Trong ngày</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 100.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT">Lịch Trình</button>
                    <div class="modal fade" id="modalYT" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                            <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center;">Lịch Trình</h1>
                                <div class="boc-noi-dung" style="text-align: justify;">
                                    <p>Thời tiết khí hậu ở Hà Nội được chia ra làm 4 mùa rõ rệt: Xuân – Hạ – Thu – Đông, mỗi mùa lại có những vẻ đẹp đặc trưng riêng mà không giống bất cứ mùa nào. Mùa xuân với những cơn mua phùn nhỏ kéo dài, thời tiết ấm áp tạo điều kiện cho cây cối phát triển và nảy mầm. Mùa hè với tiết trời khá oi bức, những đổi lại bạn sẽ được nghe những tiếng ve râm ran vô cùng thú vị. Mùa thu là khoảnh khắc giao mùa rõ rệt, với các thời tiết hơi se lạnh, mát mẻ, tạo cảm giác dễ chịu, rất thích hợp để đi dạo, chính vì thế thời gian này được xem là thời điểm du lịch Hà Nội lý tưởng nhất. Còn mùa đông ở Hà Nội khá hanh khô và lạnh buốt, nhiều khi nhiệt độ khí hậu có thể giảm xuống mức dưới 10 độ C nên bạn cần chú ý mang đầy đủ quần áo ấm nếu du lịch Hà Nội vào thời điểm này nhé</p>
                                    <h3>Phương tiện du lịch tới Hà Nội</h3>
                                    <p>Có rất nhiều phương tiện di chuyển di chuyển tới Hà Nội như: Xe máy, ô tô khách, máy bay, tàu hỏa… Bạn có thể dựa vào vị trí bạn đang ở và điều kiện kinh tế của mình mà lựa chọn phương tiện sao cho phù hợp</p>
                                    <li>                                                   
                                        <strong>Xe máy, ô tô riêng:</strong>
                                        Thích hợp với những bạn nào ở ngoại thành Hà Nội hoặc ở những vùng lân cận.
                                    </li>
                                    <li>
                                        <strong>Xe khách:</strong> 
                                        Hà Nội là trung tâm của miền Bắc, vì thế cho dù bạn ở tình nào thì cũng có xe khách đi đến Hà Nội, bạn không phải lo nhé.
                                    </li>
                                    <li>
                                        <strong>Tàu hỏa:</strong>
                                        Đối với các du khách ở khu vực miền Nam hay miền Trung thì có thể sử dụng tàu hỏa để làm phương tiện di chuyển tới Hà Nội.
                                    </li>
                                    <li>
                                        <strong>Máy bay:</strong>
                                        Nếu bạn có điều kiện kinh tế và muốn tiết kiệm thời gian di chuyển tới Hà Nội thì có thể sử dụng máy bay. Các chuyến bay tới Hà Nội thường đáp ở sân bay quốc tế Nội Bài, cách trung tâm thành phố Hà Nội khoảng 20km. Từ sân bay, bạn có thể bắt taxi để đi vào trung tâm thành phố với giá khoảng 200.000VND. Hoặc để tiết kiệm tiền, bạn cũng có thể sử dụng tuyến bus 07, 17 để vào thành phố nhé, đó là kinh nghiệm du lịch Hà Nội 1 ngày trọn vẹn, hoàn hảo.
                                    </li>                        
                                    <h3>Lịch trình du lịch Hà Nội 1 ngày</h3>
                                    <p>Vì thời gian du lịch Hà Nội của bạn chỉ có 1 ngày, nên bận cần phải xuất phát từ sớm để có nhiều thời gian khám phá Hà Nội hơn nhé. Tùy vào điểm đến mà bạn căn giờ đi sao cho khoảng 6h tới Hà Nội là được.</p>
                                    <h5>
                                        <strong>Buổi sáng:</strong>
                                    </h5>
                                    <li>6h: Đầu tiên, khi đặt chân tới Hồ Gươm, bạn tìm quán bún chả – món ăn ngon, nổi tiếng ở Hà Nội để thưởng thức hương vị tuyệt vời. Ăn xong bạn ghé thăm tới quan cà phê hoặc trà đá để tận hưởng được cuộc sống của người dân Hà Nội.
                                    Sau đó, bạn đi tìm khách sạn để nghỉ ngơi ở đây một tối nhé. Bạn nên tìm những khách sạn nằm ngoài khu vực Hồ Gươm và Phố Cổ, bởi giá phòng ở đây cao hơn những địa điểm khác.</li>
                                    <li>8h: Bạn tiếp tục lên đường ghé thăm đến Lăng Bác. Tuy nhiên bạn nhớ phải gửi xe trước khi vào viếng Lăng nhé. Tuy nhiên, lăng Bác đóng cửa vào thứ 2 và thứ 6 hàng tuần, nên bạn cần chú ý đến thời gian đi du lịch. Trong trường hợp bạn du lịch Hà Nội một ngày đúng vào ngày Lăng Bác không mở cửa thì có thể đến chùa Một Cột, nằm ngay sau Lăng và chụp những bức hình lưu niệm ở đây cũng rất tuyệt vời.</li>
                                    
                                    <li>9h: Sau khi ghé thăm Lăng Bác xong, bạn tiếp tục hành trình du lịch Hà Nội 1 ngày đầy thú vị: Đi tới Văn Miếu Quốc Tử Giám ở gần đó, cách Lăng Bác chỉ khoảng 1km, nên rất thuận tiện cho việc di chuyển. Nếu bạn không rõ đường thì hãy hỏi người dân ở xung quanh đây để được chỉ đường cụ thể hơn nhé.
                                    Sau đó bạn tham quan nhanh chóng, rồi đi thăm chùa Trấn Quốc (Nằm cách Lăng 2,5km) – Đây là ngôi chùa lâu đời và nổi tiếng nhất ở Hà Nội.</li>
                                    <li>10h30: Rời khỏi chùa Trấn Quốc, tiếp tục đến Hồ Tây, cách đó khoảng 4km để tận hưởng không gian thiên nhiên trong lành, với những cảnh đẹp của hồ cũng rất hấp dẫn. Nhưng trên đường di chuyển tới Hồ Tây gặp khá nhiều chốt công an, bạn cần chú ý đường đi, chấp hành các luật an toàn giao thông để tránh gặp rắc rối với các chú giao thông nhé.</li>
                                    
                                    <li>12h: Dừng chân nghỉ ngơi tại Hồ Tây và thưởng thức món phở bò hoặc phở cuốn cực nổi tiếng của Hà Nội nằm ngay hồ Trúc Bạch (Ngay sát Hồ Tây). Hoặc thưởng thức kem Hồ Tây cũng là trải nghiệm rất tuyệt vời đấy.</li>
                                    
                                    <h5>
                                        <strong>Buổi chiều và tối:</strong>
                                    </h5>
                                    
                                    <li>13h30: Tiếp tục lịch trình du lịch Hà Nội 1 ngày vui vẻ, giá rẻ: Đến đầu giờ chiều, bạn lên xe và đi tham quan tới bảo tàng Dân Tộc Học ở phố Nguyễn Văn Huyên (Cầu Giấy) để có cơ hội khám phá và tìm hiểu về văn hóa lịch sử của người dân Việt Nam.</li>
                                    
                                    <li>15h: Bạn quay lại Hồ Gươm để đi dạo, tản bộ và thưởng thức rất nhiều các món ăn ngon, hấp dẫn (Buổi sáng thường không có gì). Bạn tìm một chỗ gửi xe quanh đó rồi tham quan đền Ngọc Sơn, ngắm cụ rùa. Sau đó bạn đi tới phố Cổ, để khám phá cuộc sống phố xá nhộn nhịp ở Hà Nội.</li>
                                    
                                    <li>17h30: Quay trở lại khách sạn, tắm rửa, ăn tối rồi nghỉ ngơi một chút để lấy sức tối đi dạo.</li>
                                    
                                    <li>20h: Nếu bạn đi du lịch Hà Nội 1 ngày cuối tuần (t6, t7, cn) thì có thể ghé thăm chợ đêm, nằm gần Hồ Gươm. Tại chợ bạn có thể hòa mình vào cuộc sống buôn bán về đêm sôi nổi, tấp nập và mua sắm những món đồ handmade, đồ linh tinh hay một số món đồ Second Hand cũng khá hay nhé, bên cạnh đó vẫn có rất nhiều những gian hàng bán đồ quần áo, mỹ phẩm, phụ kiện… cho bạn thỏa sức mua sắm.</li>
                                </div>     
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
        
                            </div>
        
                            </div>
                            <!--/.Content-->
        
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Chùa Hương</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://mytourcdn.com/upload_images/Image/Han%20-%20Tour/ha%20hoi/xjp1404117442.jpg">
            <div class="tour-body">
                <h5>Địa chỉ: Hương Sơn, Mỹ Đức, Hà Nội</h5>
                <h5>Thời gian: Trong ngày</h5>
                <h5>Phương tiện: Ôtô</h5>
                <h5>Giá Cả: 700.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT1">Lịch Trình</button>
                    <div class="modal fade" id="modalYT1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                            <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <p>Trong chuyến du lịch chùa Hương mới nhất của mình, mình đã dành trọn vẹn một ngày để khám phá chùa Hương theo lịch trình như sau: Đền Trình - chùa Thiên Trù - động Hương Tích - chùa Tiên Sơn - chùa Thanh Sơn Hương Đài</p>
                                    <li> 
                                        <strong>7h30:</strong>
                                        xuất phát tại nội thành Hà Nội theo hướng đi Nguyễn Trãi, 9h30 có mặt tại chùa Hương, mua vé để đi đò.
                                    </li>
                                    <li>
                                        <strong>10h:</strong>
                                        xuất phát từ bến đò Suối Yến để vào lễ đền Trình. Sau đó đi đò trên Suối Yến để vào đến chùa Thiên Trù.
                                    </li>
                                    <li>
                                        <strong>Sau khi tham quan hết toàn bộ chùa Thiên Trù là khoảng 12h30:</strong>
                                        đoàn sẽ ăn trưa ngay tại chân chùa Thiên Trù, đi theo đoàn khá đông nên mình đã liên hệ với nhà hàng ngay đó để đặt cơm trưa.
                                    </li>
                                    <li>
                                        <strong>14h:</strong>
                                        mình xuất phát lên động Hương Tích. Do đoàn có trẻ nhỏ nên đã chọn đi cáp treo, di chuyển rất nhanh sẽ đến được động Hương Tích. Đến cổng trời, bạn sẽ đi xuống một bậc thang vài trăm mét để xuống động. Càng xuống sâu, càng mát lạnh và ẩm ướt.
                                    </li>
                                    <li>Sau khi lễ tại động Hương Tích, đi cáp treo về lại Thiên Trù, rồi lên chùa Tiên Sơn.</li>                                                   
                                    <li>
                                        <strong>16h:</strong>
                                        ra bến Thiên Trù, do thời gian vẫn còn khá sớm nên cả đoàn quyết định ngồi đò để vào chùa Thanh Sơn Hương Đài. Đây là một trong những ngôi chùa mà mình thích nhất tại khu danh thắng chùa Hương. Thanh Sơn Hương Đài cực kỳ yên tĩnh và thanh tịnh, với không gian thoáng đãng vô cùng. Đây cũng là nơi mà mình thường xin xăm vào mỗi đầu năm. Ngoài ra còn có động Tiểu Nhi Cầu Tự là nơi để cầu con cái, công danh, sức khỏe.
                                    </li>
                                    <li>
                                        <strong>18h:</strong> 
                                        xuất phát lên xe về Hà Nội.
                                    </li>
                                </div>    
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
        
                            </div>
        
                            </div>
                            <!--/.Content-->
        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Chùa Tam Chúc</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://media.laodong.vn/Storage/NewsPortal/2018/10/4/634327/20-TS-620677-12-7.jpg">
            <div class="tour-body">
                <h5>Điạ chỉ: Ba Sao, Kim Bảng, Hà Nam</h5>
                <h5>Thời gian: Trong ngày</h5>
                <h5>Phương tiện: Ôtô</h5>
                <h5>Giá Cả: 400.000đ-600.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT2">Lịch Trình</button>
                    <div class="modal fade" id="modalYT2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                            <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <h3>Sáng: Hà Nội – Chùa Tam Chúc – Ninh Bình ( ăn trưa )</h3>
                                    <li>
                                        <strong>07h30-08h00:</strong>
                                        Xe và hướng dẫn viên đón Quý khách tại phố Cổ và Nhà hát lớn khởi hành đi Hà Nam.
                                    </li>
                                    <li>
                                        <strong>10h00:</strong>
                                        Quý khách vào thăm quan và chiêm bái chùa Tam Chúc – Ngôi chùa linh thiêng được xây dựng với hàng nghìn bức tranh bằng đá được ghép tỉ mỉ, cẩn thận bởi đôi bàn tay tài hoa của những người thợ thủ công lành nghề. 12.000 bức tranh đá miêu tả các sự tích của Đức Phật được những người Hồi giáo Indonesia tạc bằng đá núi lửa ở Indonesia sau đó đưa sang Việt Nam. Ngoài ra, Chùa Tam Chúc còn thiết lập một vườn cột kinh khổng lồ với 1.000 cột đá, mỗi cột cao 12m, nặng 200 tấn.
                                    </li>
                                    <li>Quý khách khám phá vẻ đẹp hoang sơ, tự nhiên, sơn thủy hữu tình, đẹp như cõi của mảnh đất được ví như “Vịnh Hạ Long” trên cạn.</li>
                                    <li>
                                        <strong>11h30:</strong>
                                        Quý khách lên xe đi Ninh Bình
                                    </li>
                                    <h3>Chiều: Tràng An – Hà Nội</h3>
                                    <li>Sau bữa trưa, xe và hướng dẫn đưa du khách ra bến đò Tràng An lên thuyền đi dọc theo suối giữa cánh đồng lúa thăm khu du lịch Tràng An Mới với những dải đá vôi, thung lũng và những sông ngòi đan xen tạo nên một không gian huyền ảo, kỳ bí.</li>                                                   
                                    <li>Với tuyến này quý khách có cơ hội tham quan 4 hang động tự nhiên trong số những hang động đẹp nhất trong khu du lịch Tràng An là Hang Lấm, Hang Vạng, Hang Thánh Trượt và hang cuối cùng là Hang Đại, quý khách còn dừng chân ghé thăm 3 điểm tâm linh là đền Cao Sơn, đền Suối Tiên và Hành Cung Vũ Lâm. Tuyến này sẽ rất phù hợp với những bạn trẻ, những người thích chụp ảnh Check in, quý khách có thể có những trải nghiệm đầy đủ về hành trình ngồi đò thăm hang cũng như có thể lưu lại những cảm xúc, những bức hình đẹp trong hành trình về thăm Tràng An – Di sản văn hòa và thiên nhiên thế giới!</li>
                                    <li>
                                        <strong>17h00:</strong>
                                        Quý khách lên xe trở về Hà Nội
                                    </li>
                                    <li>
                                        <strong>19h00:</strong>  
                                        Về đến Hà Nội
                                    </p>
                                </div>      
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
        
                            </div>
        
                            </div>
                            <!--/.Content-->
        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<h2 style="text-align: center; padding-top: 50px;">Các Tour Du Lịch 2 Ngày 1 Đêm</h2>
<div class="tour-deck">
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Ecopark</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/640x359/media/b4/1f/e3f4-3d41-47b3-8bdc-4c92c5c34ef6.jpg">
            <div class="tour-body">             
                <h5>Địa chỉ: Xuân Quan, Văn Giang, Hưng Yên</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 300.000đ-400.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT3">Lịch Trình</button>
                    <div class="modal fade" id="modalYT3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                            <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <p>Đến với Ecopark, mọi hoạt động vui chơi, tham quan của bạn hầu hết được thực hiện ngoài trời. Chính bởi vậy, dù có thể đến Ecopark vào bất cứ thời gian nào, bạn nên lựa chọn những ngày trời mát mẻ, không mưa và không nắng quá gắt để vui chơi.</p>
                                    <li>
                                        <strong>Ngày 1:</strong>
                                        xuất phát từ Hà Nội tới Ecopark, có thể tham quan các công viên mùa xuân, mùa hạ, mùa thu. Sau khi ăn trưa có thể ra hồ bơi và dùng tiệc nướng vào buổi tối.
                                    </li>
                                    <li>
                                        <strong>Ngày 2:</strong>
                                        Gia đình có thể đốt lửa trại, đi xe đạp quanh khuôn viên và quay về Hà Nội vào buổi chiều.
                                    </li>
                                    <h4>Gợi ý ăn uống khi đến Ecopark</h4>
                                    <li>Khu đô thị Ecopark có đầy đủ chuỗi cửa hàng ẩm thực đa dạng và phong phú, vì thế các bạn có thể khám phá ẩm thực đủ các vùng miền tại đây. Từ đồ ăn bình dân cho tới những món ăn hiện đại, tất cả đều được chế biến vô cùng tỉ mỉ và hấp dẫn. Các bạn có thể ghé qua những quán ăn, nhà hàng như: Nhà hàng Gà Lên Mâm, Cây Cau, ẩm thực Mường,…</li>
                                    <li>Nếu muốn nhâm nhi thêm tách cafe sau bữa ăn, có thể đến với Ciao Cafe, Link Cafe hay Cà phê Đak Hà ở ngay trong khu đô thị.</li>
                                    <h4>Ưu điểm và nhược điểm khi du lịch tại Tam Đảo</h4>
                                    <strong style="font-style: italic;">Ưu điểm</strong>
                                    <li>Phù hợp với du lịch cùng gia đình.</li>
                                    <li>Có không gian cắm trại, picnic,...</li>
                                    <li>Hồ điều hòa trong lành và mát mẻ, thích hợp du lịch 4 mùa.</li>
                                    <li>Không gian hiện đại, thoáng đãng.</li>
                                    <li>Gần ngay trung tâm Hà Nội.</li>
                                    <strong style="font-style: italic;">Nhược điểm</strong>
                                    <li>Không có những địa điểm cho các bạn ưa mạo hiểm, thích khám phá.</li>
                                    <li>Chỉ phù hợp với những du khách ưa thích kiểu du lịch nghỉ dưỡng.</li>
                                    <li>Giá cả và chi phí dịch vụ khá cao.</li>
                                </div>                                            
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
        
                            </div>
        
                            </div>
                            <!--/.Content-->
        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Hồ Đại Lải</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/1024x576/media/5e/a4/0a6b-3f4c-4951-bf6d-f9f2c936167f.jpg">
            <div class="tour-body">
                <h5>Địa chỉ: Vĩnh Phúc</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 700.000đ-2.500.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT4">Lịch Trình</button>
                    <div class="modal fade" id="modalYT4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <h3 style="text-align: center;">Ngày thứ 1: Hà Nội – Flamingo Đại Lải</h3>
                                    <li>
                                        <strong>Buổi sáng:</strong>
                                        Sau khi di chuyển tới Flamingo Đại Lải tham quan, chụp ảnh tại câu lạc bộ nghệ thuật và nhà hàng Bambo Wings. Thăm hầm rượu nơi lưu trữ các loại rượu vang nổi tiếng trên thế giới, chụp ảnh trên các đồi cỏ nghệ thuật. Thăm Trung tâm hội nghị – công trình kiến trúc độc đáo với cảnh quan đá trên các đồi cỏ, thăm phòng trưng bày Flamingo.
                                    </li>
                                    <li>
                                        <strong>Buổi trưa:</strong>
                                        Ăn trưa và nghỉ ngơi.
                                    </li>
                                    <li>
                                        <strong>Buổi chiều:</strong>
                                        Tham quan và chụp ảnh tại các cánh đồng hoa, cánh đồng sắc màu, chụp ảnh tại đồi nghệ thuật nơi có tầm nhìn bởi dãy Tam Đảo hùng vĩ bao quanh Khu du lịch. Tham quan và chụp ảnh tại vườn Khô Đại Lải
                                    </li>
                                    <li>Tham quan rừng thông thơ mộng với những thảm lá thông dày và hương thông tinh khiết, ngắm mặt trời lặn dần dưới rặng thông. Tham quan và vui chơi tại công viên trò chơi Wonder Park.</li>
                                    <li>Tham gia các hoạt động thể thao dưới nước như Kayak, lướt ván buồm, thuyền gỗ Whitehall, thuyền buồn Mist và Alaska hoặc du thuyền 5 sao Bayliner. Ăn bữa tối lãng mạn trên thảm cỏ bên bờ hồ thơ mộng với các món BBQ với lửa, đuốc, nến và hoa.</li>
                                    <h3 style="text-align: center;">Ngày thứ 2:Flamingo Đại Lải –  Hà Nội</h3>                                                   
                                    <strong>Buổi sáng mọi người có thể lựa chọn các hoạt động vui chơi và tham quan sau:</strong>
                                    <li>Tham gia học làm vườn và trồng rau sạch.</li>
                                    <li>Thi đấu cờ vua với bàn cờ khổng lồ.</li>
                                    <li>Thư giãn tại khu Spa Flamingo.</li>
                                    <li>Luyện giọng hát tại phòng Karaoke.</li>
                                    <li>Đăng ký học và thực hành các hoạt động thể thao dưới nước: Chèo thuyền, thuyền buồm, lướt ván buồm…</li>
                                    <li>Tham quan Hang Dơi, Đèo Nhe và phong cảnh rừng núi cuộc sống thôn dã bằng xe jeep.</li>
                                    <p>
                                        <strong>Buổi trưa:</strong>
                                        Ăn trưa, nghỉ ngơi, trả phòng và lên đường về Hà Nội.
                                    </p>
                                </div>      
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Tam Đảo</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/924x616/media/f2/33/8281-cd87-476d-8013-d97b80ff94cf.jpg">
            <div class="tour-body">
                <h5>Địa chỉ: Vĩnh Phúc</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 500.000đ-1.000.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT5">Lịch Trình</button>
                    <div class="modal fade" id="modalYT5" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <p>Khí hậu Tam Đảo mang sắc thái của vùng khí hậu ôn đới nên mát mẻ quanh năm, nhiệt độ trung bình từ 18-19 độ C. Ngoài ra, nơi đây lúc nào cũng có một lớp sương mù lành lạnh, thuận lợi cho Tam Đảo trở thành điểm du lịch thiên đường.</p>
                                    <li>
                                        <strong>Ngày 1:</strong>
                                        Khởi hành từ Hà Nội tới Thiền viện Tây Thiên, hoặc đi Chùa Tây Thiên và tham quan tại đây. Có thể dùng cơm trưa tại đây hoặc ăn bên ngoài. Buổi trưa có mặt và nhận phòng tại Tam Đảo. Chiều tham quan tháp truyền hình. Buổi tối có thể đi ăn đồ nướng, ốc,...
                                    </li>
                                    <li>
                                        <strong>Ngày 2:</strong>
                                        Ăn sáng, đi chợ sớm để tham quan và mua quà. Có thể đi thêm Thác Bạc, nhà thờ Tam Đảo, thăm vườn quốc gia Tam Đảo. Buổi trưa về trả phòng nghỉ và quay lại Hà Nội.
                                    </li>
                                    <h4>Gợi ý ăn uống khi đến Tam Đảo</h4>
                                    <li>Tam Đảo khá nổi tiếng với những món đặc trưng là rau su su và đồ nướng. Rau su su được trồng tại vùng khí hậu mát mẻ và thổ nhưỡng thích hợp nên luôn tươi ngon, dù luộc hay xào đều hoàn hảo. Ngoài ra, món gà nướng bọc giấy bạc cũng là món ăn mà bạn không nên bỏ qua khi đặt chân đến Tam Đảo.</li>
                                    <h4>Ưu điểm và nhược điểm khi du lịch tại Tam Đảo</h4>
                                    <strong style="font-style: italic;">Ưu điểm</strong>
                                    <li>Phù hợp với gia đình nhiều người. Ngoài ra thích hợp cả với những nhóm bạn trẻ ưa khám phá.</li>
                                    <li>Thích hợp để đi vào cả 4 mùa trong năm.</li>
                                    <li>Có không gian cắm trại, picnic,...</li>
                                    <li>Nhiều đặc sản ngon, dễ ăn.</li>
                                    <strong style="font-style: italic;">Nhược điểm</strong>
                                    <li>Dịch vụ hơi đắt đỏ.</li>
                                    <li>Đồ ăn tại các nhà nghỉ thường không ngon.</li>
                                    <li>Ít địa điểm nên chỉ nên đi trong 2 ngày</li>
                                    <li>Có thể đông đúc và quá tải vào những mùa cao điểm du lịch.</li>
                                </div>     
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>My hill</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/825x550/media/fb/42/3a85-6613-46e2-9ab1-8dbc4b71467b.jpg">
            <div class="tour-body">
                <h5>Địa chỉ: Quang Tiến, Sóc Sơn, Hà Nội</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 300.000đ-500.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT6">Lịch Trình</button>
                    <div class="modal fade" id="modalYT6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <p>Tất cả các thời điểm, các mùa trong năm bạn đều có thể đế với My Hill. Tuy nhiên, vì các hoạt động cắm trại, vui chơi được tổ chức hoàn toàn ngoài trời nên hãy chọn một ngày nắng đẹp, không mưa và khô ráo để đi chơi nhé.</p>
                                    <li>
                                        <strong>Ngày 1:</strong>
                                        xuất phát từ Hà Nội đến My Hill, tham quan, thuê đồ và dựng lều trại. Buổi tối có thể nướng đồ ăn, tham gia các hoạt động vui chơi, âm nhạc và giao lưu
                                    </li>
                                    <li>
                                        <strong>Ngày 2:</strong> 
                                        Tham quan, chụp ảnh, trải nghiệm không gian hồ My Hill. Buổi chiều trả đồ và quay về Hà Nội.
                                    </li>
                                    <h4>Gợi ý ăn uống tại My Hill</h4>
                                    <li>My Hill là khu du lịch sinh thái với phong cách tự phục vụ. Ở đây không có sẵn nhiều hàng quán, dịch vụ mà hầu hết các bạn sẽ tự làm hết. Bạn có thể chuẩn bị đồ ăn ở nhà mang đến hoặc đặt trước theo dịch vụ tại đây</li>
                                    <h4>Ưu điểm và nhược điểm khi du lịch My Hill</h4>
                                    <strong style="font-style: italic;">Ưu điểm</strong>
                                    <li>Không quá xa trung tâm Hà Nội</li>
                                    <li>Đồ ăn khá rẻ và ngon</li>
                                    <li>Dịch vụ tốt, phong cảnh đẹp</li>
                                    <li>Có không gian tổ chức cắm trại, picnic, gameshow</li>
                                    <strong style="font-style: italic;">Nhược điểm</strong>
                                    <li>Có nhiều côn trùng</li>
                                    <li>Các ngày trong tuần thường có ít nhân viên chăm sóc</li>
                                    <li>Hồ Đồng Quan khá sâu và nguy hiểm</li>
                                </div>
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Ba Vì</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/du-lich-ba-vi-vuon-quoc-gia-2.jpg">
            <div class="tour-body">
                <h5>Điạ chỉ: Ba Vì</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 700.000đ-4.000.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT7">Lịch Trình</button>
                    <div class="modal fade" id="modalYT7" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <h3 style="text-align: center;">Ngày thứ nhất:</h3>
                                    <li>
                                        <strong>6h00:</strong>
                                        Bắt đầu xuất phát từ BigC Thăng Long, theo Đại lộ Thăng Long để đến vườn quốc gia Ba Vì.
                                    </li>
                                    <li>
                                        <strong>7h45:</strong>
                                        Đến cổng vườn quốc gia, mua vé rồi đi thẳng 1100m để lên đền Thượng (cách cổng vườn quốc gia 12km). Đường đến đền Thượng nhiều khúc cua hiểm và dốc, các bạn nhớ di chuyển hết sức cẩn thận và quan sát kỹ xung quanh.
                                    </li>
                                    <li>
                                        <strong>8h15:</strong>
                                        Lên đến cốt 1100m các bạn gửi xe rồi rẽ phải để lên Đền Thượng và đền Mẫu.
                                    </li>
                                    <li>
                                        <strong>12h:</strong>
                                        nghỉ ngơi, ăn trưa.
                                    </li>
                                    <li>
                                        <strong>13h:</strong> 
                                        Quay về cốt 400m để nghỉ và ăn tối ở nhà hàng trong khu du lịch vườn quốc gia Ba Vì. Trên đường quay xuống có một số di tích mà các bạn có thể tham quan: Nhà thờ cổ và Trại hè thời pháp, nhà tù chính trị, cốt 600m (nơi đánh dấu trận đánh của trung đoàn Ba Vì), động Ngọc Hoa, vườn xương rồng.
                                    </li>
                                    <li>
                                        <strong>19h:</strong> 
                                        Các bạn sẽ được  cảm nhận cái lạnh se se của mùa đông, không gian tĩnh lặng của một vùng quê và đón ánh nắng bình minh xen qua những tán lá thông ở cốt 400.
                                    </li>
                                    <h3 style="text-align: center;">Ngày thứ 2:</h3>
                                    <li>
                                        <strong>7h:</strong> 
                                        Ăn sáng tại cốt 400
                                    </li>
                                    <li>
                                        <strong>8h:</strong>
                                        Xuất phát xuống khu du lịch Thiên Sơn – Suối Ngà cách cổng Vườn Quốc Gia 2km. Tại đây, các bạn được tắm thác, bơi tại bể bơi, trượt cầu trượt nước từ trên cao..
                                    </li>
                                    <li>
                                        <strong>11h30:</strong> 
                                        Ăn trưa tại Thiên Sơn – Suối Ngà với những món đặc sản rừng núi.
                                    </li>
                                    <li>
                                        <strong>13h:</strong> 
                                        Xuất phát đi Khoang Xanh hoặc Ao Vua để tận hưởng các trò chơi cảm giác mạnh thách thức độ gan dạ của mỗi người. Ngoài các trò chơi trên Ở Khoang Xanh có Thung Lũng Khủng Long cho các bé tìm hiểu thiên nhiên còn Ao Vua lại có bể tắm trà xanh, có nơi Spa lý tưởng cho mọi người.
                                    </li>
                                    <li>
                                        <strong>16h30:</strong> 
                                        Rời khỏi khu du lịch và trở về Hà Nội.
                                    </li>
                                </div>     
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Mai Châu</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/825x550/media/6d/e2/a1f4-9d16-48b0-b04b-fb7d38482598.jpg">
            <div class="tour-body">
                <h5>Địa chỉ: Mai Châu</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 200.000đ-400.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT8">Lịch Trình</button>
                    <div class="modal fade" id="modalYT8" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <h3 style="text-align: center;">Ngày 1: Hà Nội - Mai Châu (Ăn trưa, tối):</h3>
                                    <li>
                                        <strong>06h30 :</strong> 
                                        Khởi hành từ Hà Nội để bắt đầu tour du lịch Mai Châu 2 ngày 1 đêm.
                                    </li>
                                    <li>07h30 : Đoàn dừng chân ăn sáng tự túc trên đường.</li>
                                    <li>
                                        <strong>09h30 :</strong> 
                                        Quý khách tiếp tục dừng chân nghỉ ngơi và chụp ảnh tại đèo Thung Khe – Hòa Bình. Khi tới đèo Thung Khe quý khách sẽ thấy một khung cảnh đẹp hết sức bình dị như là biển mây và…ngô luộc, mía tía, cơm lam, cải mèo. Ở Thung Khe – Hòa Bình một ngày như có bốn mùa. Sáng trong trẻo, trưa chói chang, chiều dìu dịu và khi màn đêm buông xuống là sương mù dày đặc.
                                    </li>
                                    <li>
                                        <strong>10h30 :</strong> 
                                        Quý khách đặt chân đến bản Lác – Mai Châu. Bản Lác được mệnh danh là thủ đô của người Thái. Quý khách nghỉ ngơi, dùng bữa trưa với những món ăn truyền thống mang hương vị của núi rừng.
                                    </li>
                                    <li>
                                        <strong>14h00 – 16h00 :</strong> 
                                        Quý khách tham gia chương trình khám phá thung lũng Mai Châu, thăm những ngôi nhà sàn nhỏ xinh của người Thái để tìm hiểu những nét văn hóa, phong tục tập quán độc đáo của họ.
                                    </li>
                                    <li>
                                        <strong>16h00 - 18h00 :</strong> 
                                        Tự do dạo chơi tham quan chụp ảnh thung lũng Mai Châu
                                    </li>
                                    <li>
                                        <strong>18h30 :</strong> 
                                        Quý khách dùng bữa tối tại nhà sàn truyền thống của người Thái.
                                    </li>
                                    <li>
                                        <strong>19h30 – 21h30 :</strong>  
                                        Quý khách tham gia các hoạt động, chương trình giao lưu văn nghệ, múa hát của các chàng trai, cô gái dân tộc Thái, uống rượu cần, đốt lửa trại.
                                    </li>
                                    <h3 style="text-align: center;">Ngày 2: Mai Châu – Chợ phiên dân tộc - Khám phá hang Chiều/ Thác Gò Lào - Hà Nội (Bữa sáng, trưa)</h3>
                                    <li>
                                        <strong>07h00 :</strong>
                                        Quý khách thức dậy ngắm cảnh bình minh, tận hưởng những giây phút tĩnh lặng, yên bình trước khi có điểm tâm nhẹ
                                    </li>
                                    <li>
                                        <strong>08h30 – 11h00 :</strong> 
                                        Hướng dẫn viên sẽ đưa quý khách tham quan chợ phiên dân tộc tại Mai Châu, một hoạt động truyền thống của đồng bào dân tộc nơi đây.
                                    </li>
                                    <li>
                                        <strong>11h30 :</strong>
                                        Quý khách quay trở lại bản Lác dùng bữa, sau đó tự do khám phá, du lịch Mai Châu trước khi ra về.
                                    </li>
                                    <li>
                                        <strong>13h00 :</strong> 
                                        Quý khách lên xe, tạm biệt Mai Châu yên bình, đoàn trở về Hà Nội.
                                    </li>
                                    <li>
                                        <strong>17h00 :</strong> 
                                        Xe đưa quý khách về tới Hà Nội
                                    </li>
                                </div>     
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Núi Trầm</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/653x420/media/de/a1/00d4-4cd3-4cb3-86f6-a30ff4425e48.jpg">
            <div class="tour-body">
                <h5>Điạ chỉ: Chương Mỹ, Hà Nội</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 10.000đ-150.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT9">Lịch Trình</button>
                    <div class="modal fade" id="modalYT9" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <p>Núi Trầm là địa điểm bạn có thể tới vào bất cứ mùa nào trong năm. Tuy nhiên, bạn có thể lựa chọn đi tới đây cùng gia đình vào thời gian từ đầu tháng 3 đến đầu tháng 4. Đây chính là lúc hoa xưa trắng bao phủ cả đồi núi và hoa gạo nhuộm đỏ một góc trời, tạo nên khung cảnh vô cùng đẹp mắt.</p>
                
                                    <li>
                                        <strong>Ngày 1:</strong> 
                                        xuất phát từ Hà Nội, chuẩn bị đồ ăn và vật dụng cần thiết cho việc leo núi. Tới núi Trầm thuê đồ dùng cần thiết và leo núi. Lên đến đỉnh núi thì dựng lều trại, có thể đốt lửa và nướng đồ ăn. Buổi tối tham gia một số trò chơi tập thể, hát hò, kể chuyện.
                                    </li>
                                    <li>
                                        <strong>Ngày 2:</strong> 
                                        Chụp hình, leo núi, tham quan hồ núi Trầm và ăn trưa. Buổi chiều dọn đồ đạc xuống núi và trở về Hà Nội.
                                    </li>
                                    <h4>Gợi ý ăn uống tại núi Trầm</h4>
                                    <li>Tại núi Trầm không có quá nhiều quán ăn cũng như đặc sản để bạn thưởng thức. Chính bởi vậy, hợp lý nhất là bạn nên chuẩn bị và mang theo đồ nguội cho cả gia đình mình.</li>
                                    <h4>Ưu điểm và nhược điểm du lịch núi Trầm</h4>   
                                    <strong style="font-style: italic;">Ưu điểm</strong>
                                    <li>Phù hợp với gia đình nhiều thế hệ, đặc biệt là trẻ em và người lớn tuổi.</li>
                                    <li>Các nhóm bạn trẻ cũng có thể phù hợp với địa điểm này</li>
                                    <li>Có không gian cắm trại, picnic,...</li>
                                    <li>Chi phí rẻ và hợp lý.</li>
                                    <li>Không khí trong lành, thoáng mát, không bụi bặm, xô bồ.</li>
                                    <strong style="font-style: italic;">Nhược điểm</strong>
                                    <li>Có ít điểm vui chơi.</li>
                                    <li>Không phù hợp với các gia đình thích du lịch kiểu nghỉ dưỡng</li>
                                    <li>Không có các món ăn đặc sản</li>
                                </div>      
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Hàm Lợn</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/660x439/media/72/f7/c581-331d-4003-b28c-825e6515d40c.jpg">
            <div class="tour-body">
                <h5>Địa chỉ: Độc Tôn, Sóc Sơn, Hà Nội</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 300.000đ-400.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT10">Lịch Trình</button>
                    <div class="modal fade" id="modalYT10" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <p>Du lịch Hàm Lợn có thể đi cả vào bốn mùa, tùy thuộc vào bạn thích trải nghiệm mà nóng hay lạnh. Sự lựa chọn tốt nhất là bạn nên đi vào mùa xuân hoặc thu, khi thời tiết khô ráo, mát mẻ và không mưa quá nhiều. Các nhóm bạn trẻ không nên tới đây vào mùa mưa, nước dâng bởi sẽ không an toàn.</p>
                
                                    <li>Ngày 1: Từ Hà Nội đến Hồ Núi Bàu, cắm trại và ăn uống ngay bên hồ. Buổi tối sẽ thưởng thức các món ăn như gà nướng, cá nướng, cơm nắm…</li>
                                    <li>Ngày 2: Chinh phục đỉnh Hàm Lợn, dựng lều nghỉ ngơi trên đỉnh núi, buổi chiều quay xuống chân núi và trở về Hà Nội.</li>
                                    <h4>Gợi ý ăn uống tại Hàm Lợn</h4>
                                    <li>Ở dưới chân núi có khá nhiều dịch vụ bán đồ ăn, cho thuê lều trại, hướng dẫn dẫn đường,... Tuy nhiên, các bạn nên chuẩn bị đồ ăn nhẹ và đồ nướng, mang đi từ nhà để tiết kiệm chi phí và chuyến đi được chu đáo hơn nhé!</li>
                                    <h4>Ưu điểm và nhược điểm khi du lịch tại Hàm Lợn</h4>   
                                    <strong style="font-style: italic;">Ưu điểm</strong>
                                    <li>Không quá xa trung tâm Hà Nội</li>
                                    <li>Đồ ăn khá rẻ và ngon</li>
                                    <li>Dịch vụ tốt, phong cảnh đẹp</li>
                                    <li>Có không gian tổ chức cắm trại, picnic, gameshow</li>
                                    <strong style="font-style: italic;">Nhược điểm</strong>
                                    <li>Có nhiều côn trùng</li>
                                    <li>Các ngày trong tuần thường có ít nhân viên chăm sóc</li>
                                    <li>Hồ Đồng Quan khá sâu và nguy hiểm</li>
                                </div>      
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
        <div class="tour">
            <h3>Khoang xanh - Suối tiên</h3>
            <img class="card-img-top img-fluid img-nhd" src="https://cdn.justfly.vn/640x428/media/73/b5/474d-eab7-4575-9cdb-27472ffaa37e.jpg">
            <div class="tour-body">
                <h5>Địa chỉ: Vân Hoà, Ba Vì, Hà Nội</h5>
                <h5>Thời gian: 2 ngày 1 đêm</h5>
                <h5>Phương tiện: Xe máy, Ôtô</h5>
                <h5>Giá Cả: 500.000đ</h5>
                <div class="schedule-nhd">
                    <button type="button" class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT11">Lịch Trình</button>
                    <div class="modal fade" id="modalYT11" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-lg" role="document">
                          <!--Content-->
                            <div class="modal-content">
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <h1 style="text-align: center";>Lịch Trình</h1>
                                <div class="boc-noi-dung style="text-align: start;>
                                    <h3 style="text-align: center;">Ngày 1</h3>
                                    <li>
                                        <strong>7h00:</strong>
                                        Khởi hành tới khu du lịch Khoang Xanh - Suối Tiên, một quần thể du lịch sơn thủy hữu tình nằm ngay tại cửa ngõ thủ đô thuộc huyện Ba Vì.
                                    </li>
                                    <li>
                                        <strong>9h00:</strong> 
                                        Qúy khách tới Khoang Xanh, nhận phòng nghỉ ngơi và tự do tham quan.
                                    </li>
                                    <li>
                                        <strong>11h30:</strong> 
                                        Quý khách tập trung tại nhà hàng Suối Tiên  để dùng bữa trưa.
                                    </li>
                                    <li>
                                        <strong>14h00:</strong> 
                                        HDV sẽ đưa quý khách tham quan khám phá vẻ đẹp hoang sơ, hùng vĩ của Khoang Xanh,chiêm ngưỡng dòng suối Tiên vắt mình từ trên cao, len lỏi qua các sườn đá, tham quan thác Mơ, thác Mâm Xôi, thác Hòa Lan… 
                                    </li>
                                    <li>Đỉnh núi Vua, nơi có khu rừng nguyên sinh với hệ động thực vật phong phú và các loài cây cổ thụ quý hiếm sẽ đem lại sự bất ngờ cho qúy khách. Khu bảo tồn động vật hoang dã, công viên khủng long, hồ tạo sóng, những cửa hàng bán đồ lưu niệm…cũng đang đợi bước chân du khách.</li>                                                
                                    <li>
                                        <strong>18h30:</strong> 
                                        Quý khách ăn tối tại nhà hàng Suối Tiên
                                    </li>
                                    <h3 style="text-align: center;">Ngày 2</h3>   
                                    <li>
                                        <strong>7h00:</strong> 
                                        Quý khách ăn sáng tại Nhà hàng Suối Tiên
                                    </li>
                                    <li>
                                        <strong>8h30:</strong> 
                                        HDV đưa Quý khách tới trung tâm Suối khoáng nóng VIP SPA để tận hưởng cảm giác thư giãn thoải mái tuyệt vời sau quy trình xông hơi, tắm khoáng nóng.
                                    </li>
                                    <li>
                                        <strong>12h00:</strong> 
                                        Quý khách tập trung về nhà hàng Suối Tiên để dùng bữa trưa, sau đó nghỉ ngơi và trả phòng.
                                    </li>
                                    <li>
                                        <strong>14h00:</strong> 
                                        Quý khách lên xe trở về Hà Nội. Dọc đường đi quý khách có thể dừng lại để mua đặc sản sữa tươi Ba Vì về làm quà. Hẹn gặp lại Quý khách! 
                                    </li>
                                    <li>
                                        <strong>17h00:</strong> 
                                        Về đến Hà Nội, trở lại điểm đón ban đầu, kết thúc chương trình
                                    </li>
                                </div>    
                            </div>
                            <!--Footer-->
                            <div class="modal-footer flex-column flex-md-row">
                            <div class="boc-cai-button">
                                <button type="button" class="btn btn-outline-light text-dark">Thêm vào list</button>
                            </div>
                    
                            </div>
                    
                          </div>
                          <!--/.Content-->
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>`,
    loading:`<div style="height: 100vh;display: flex;align-items: center;justify-content: center;">
    <div>
    <div class="lds-heart">
        <div></div>
    </div>
        <div class="display-4" style="
    text-align: center;
">Where To Go...</div>
        
  </div>
    
</div>`,
    adminPage:`
<nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
  <div class="container-fluid">
      <a class="navbar-branch mr-4" href="#" onclick="utils.showHomeWhenClickOnLogo()">
          <img height="45px" src="./img/logo.JPG" style="border-radius: 50%;">
          Where to go</a>
      <form class="form-inline input-nav" action="/action_page.php">
          <input class="form-control mr-sm-2" type="text" placeholder="Tìm kiếm">
          <button class="btn btn-outline-light" type="submit"> <i class="fas fa-search"
                  style="color:  rgb(133, 133, 231);"></i> </button>
      </form>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                  <a class="nav-link active" href="#">Home</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#">Chat</a>
              </li>
              <li class="nav-item mr-4">
                  <a class="nav-link" href="#">Team</a>
              </li>
              <li  class="nav-item">
                  <a id="dangNhapChange" class="nav-link pr-0" href="#">Đăng Nhập</a>
              </li>
              <li  class="nav-item">
                  <a id="dangKyChange" class="nav-link" href="#"></a>
              </li>

          </ul>
      </div>
  </div>
</nav>
<section id="body-admin" class="row " >

</section>
<div style="margin-top: 20px;" class="container container-card">
  <div id="list-deck" class="row">
  </div>
</div>     
  <script src="./js/card.js"></script>
  <footer>
    <div class="container-fluid padding">
        <div class="row text-center">
            <div class="col-md-5">
                <hr class="light">
                <h5>Team</h5>
                <hr class="light">
                <p>Nguyễn Văn Cường</p>
                <p>Nguyễn Hồng Hà</p>
                <p>Phùng Minh Huyền</p>
                <p>Nguyễn Hữu Đức</p>
            </div>
            <div class="col-md-2">
                <img height="200px" style="padding-top: 20px;" src="./img/logo.JPG">
            </div>
            <div class="col-md-5">
                <hr class="light">
                <h5>Liên Hệ</h5>
                <hr class="light">
                <p>wtgmindx@gmail.com</p>
                <p>Hanoi, Vietnam</p>
                <p>0374523912</p>
                <div class="social-media">
                    <ul>
                        <a>
                            <li id="fbnek"><img src="img/FbIcon.png"></li>
                        </a>
                        <a>
                            <li id="googlenek"><img src="./img/instagram.png"></li>
                        </a>
                        <a>
                            <li id="phonenek"><img src="img/messenger.png"></li>
                        </a>
                        <a>
                            <li id="githubnek"><img src="img/zalo.png"></li>
                        </a>
                    </ul>
                </div>
            </div>
            <div class="col-12">
                <hr class="light-80">
                <h5>&copy; Where to go!</h5>
            </div>
        </div>
    </div>
    </footer>


  `,
  chat: `

  <section class="chat-container-h">
    <div class="aside-left-h">
      <div class="list-conversation-h">
      </div>
      <form class="form-add-conversation-h">
                <div class="input-wrapper">
                  <input type="text" name="title" placeholder="New conversation title">
                  <div id="title-error" class="message-error"></div>
                </div>
                <div class="input-wrapper">
                  <input type="email" name="friendEmail" placeholder="Your friend email">
                  <div id="friend-email-error" class="message-error"></div>
                </div>
                <button type="submit" class="btn-icon">
                  <i class="fas fa-plus"></i>
                </button>
              </form>       
       </div>
    <div class="current-conversation-h">
      <div class="list-message-chat-h">
      </div>
      <form class="form-add-message-chat-h">
        <div class="input-wrapper">
          <input type="text" name="message" placeholder="Enter your message...">
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
    <div class="aside-right-h">
      <div class="details-current-conversation-h">
      </div>
      <div class="btn-leave-conversation-wrapper-h">
        <button id="btn-leave-conversation-h" class="btn-icon-h">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
  </section>
  `,
  nav: `
  <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
    <div class="container-fluid">
        <a class="navbar-branch mr-4" href="#" onclick="utils.showHomeWhenClickOnLogo()">
            <img height="45px" src="./img/logo.JPG" style="border-radius: 50%;">
            Where to go</a>
        <form class="form-inline input-nav" action="/action_page.php">
            <input class="form-control mr-sm-2" type="text" placeholder="Tìm kiếm">
            <button class="btn btn-outline-light" type="submit"> <i class="fas fa-search"
                    style="color:  rgb(133, 133, 231);"></i> </button>
        </form>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#" >Home</a>
                </li>
                <li class="nav-item mr-4">
                    <a class="nav-link" href="#">Team</a>
                </li>
                <li  class="nav-item">
                    <a id="dangNhapChange" class="nav-link pr-0" href="#">Đăng Nhập</a>
                </li>
                <li  class="nav-item">
                    <a id="dangKyChange" class="nav-link" href="#"></a>
                </li>
  
            </ul>
        </div>
    </div>
  </nav>
  `
  
  
}