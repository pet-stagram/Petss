import React, { useState } from "react";
import Logincss from "./Login.module.css";
import Logo from "../../images/loginLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

function Login({ setIsLogined }) {
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다"),
    password: yup.string().required("비밀번호를 입력해주세요"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });
  //1. 이메일 ,비밀번호 저장할 변수를 만든다.
  const [user, setUser] = useState({ email: "", password: "" });

  //입력값 감지
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (user.email !== "") {
      errors.email = false;
    }
    if (user.password !== "") {
      errors.password = false;
    }
  };

  //제출
  const onSubmit = (e) => {
    // e.preventDefault();
    console.log(user);

    if (user !== "") {
      //값이 다 입력됐다면
      Log();
    } else if (user === "") {
      alert("이메일과 비밀번호를 입력바랍니다.");
    }
  };

  //db전달
  function Log() {
    axios({
      method: "POST",
      url: `api/auth/login`,
      data: user,
      withCredentials: true,
    })
      .then((res) => {
        setTimeout(() => {
          setIsLogined("true");
          localStorage.setItem("isLogin", "true");
        }, 150);
      })
      .catch((e) => {
        alert("비밀번호가 틀렸거나 계정이 존재하지 않습니다.");
        // console.log(e);
      });
  }
  //아이디, 비밀번호 찾기 팝업창
  const [openModal, setOpenModal] = useState(false);

  //모달창 노출
  const showModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <context>
        <body>
          <div className={Logincss.logContainer}>
            <div className={Logincss.mainBox}>
              <div className={Logincss.logoBox}>
                <div className={Logincss.logo}>
                  <div>
                    <img src={Logo} alt="펫스 로고 사진" />
                  </div>
                </div>
              </div>
              <div className={Logincss.logBox}>
                <form
                  className={Logincss.login}
                  method="post"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h1 className={Logincss.loginIcon}>
                    <FontAwesomeIcon icon={faPaw} />
                  </h1>
                  <div className={Logincss.inputwrap}>
                    <input
                      type="email"
                      placeholder="이메일"
                      className={Logincss.logInput}
                      id={Logincss.logEmail}
                      name="email"
                      autoComplete="off"
                      {...register("email")}
                      onChange={onChange}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className={Logincss.inputwrap}>
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className={Logincss.logInput}
                      id={Logincss.pw}
                      name="password"
                      autoComplete="off"
                      {...register("password")}
                      onChange={onChange}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>

                  <input
                    type="submit"
                    value="로그인"
                    className={Logincss.logInput}
                    id={Logincss.logBtn}
                    style={{ marginBottom: "30px" }}
                  />
                  {/* 로그인 버튼 눌렀을 때 아이디 비밀번호 일치하면 -> 피드화면으로 넘어가기
                        아이디가 틀렸을 시 -> "존재하지 않는 아이디 입니다."
                        비밀번호가 틀렸을 시  -> "비밀번호가 일치하지 않습니다."  */}
                  <div className={Logincss.findPw}>
                    <a className="openModalBtn" onClick={showModal} href>
                      비밀번호를 잊으셨나요?
                    </a>
                    {openModal && <Modal setOpenModal={setOpenModal} />}
                  </div>
                  <div className={Logincss.mvReg}>
                    <a href="/register">계정이 없으신가요? 가입하기</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </body>
      </context>
    </>
  );
}

export default Login;
