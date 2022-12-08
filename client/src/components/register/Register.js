import React, { useState } from "react";
import Logo from "../../images/regLogo.png";
import "./register.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isNickOk, setIsNickOk] = useState(false);
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [account, setAccount] = useState({
    regName: "",
    nick: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
  });
  const [disable, setDisable] = useState(true);

  //blur : 요소의 포커스가 해제되었을 때 발생..
  //trim()을 해주어야 space(공백)을 string으로 인식 안 함!! 필수!
  const formSchema = yup.object().shape({
    regName: yup.string().trim().required("이름을 입력해주세요"),
    nick: yup.string().trim().required("활동명을 입력해주세요"),
    phone: yup.string().trim().required("휴대폰 번호를 입력해주세요"),
    email: yup
      .string()
      .trim()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .trim()
      .required("영문, 숫자포함 8자리를 입력해주세요")
      .min(8, "최소 8자 이상 가능합니다.")
      .max(30, "최대 30자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .trim()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  //mode를 onTouched로 해줘야 input focusout때마다 유효성 검사된다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //onTouched랑 resolver 둘 다 있어야 error message뜬다.
    mode: "onTouched",
    // validationSchema: formSchema,
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    if (account.regName !== "") {
      errors.regName = false;
    }
    if (account.nick !== "") {
      errors.nick = false;
    }
    if (account.password !== "") {
      errors.password = false;
    }
    if (account.passwordConfirm !== "") {
      errors.passwordConfirm = false;
    }
    if (account.phone !== "") {
      errors.phone = false;
    }
    if (account.email !== "") {
      errors.email = false;
    }
  };

  //닉네임 중복 체크 함수
  const nickCheck = (e) => {
    axios({
      method: "POST",
      url: `api/auth/nick`,
      data: { nick: account.nick },

      //객체 생성 => {key : value}
    })
      .then((res) => {
        setIsNickOk(true); //200이면 사용가능하므로 true
        alert("사용 가능한 활동명입니다.");
        console.log(res);
      })
      .catch((e) => {
        setIsNickOk(false);
        alert("이미 사용 중인 활동명입니다.");
        console.log(e);
      });
  };

  //이메일 중복 체크 함수
  const emailCheck = (e) => {
    axios({
      method: "POST",
      url: `api/auth/email`,
      data: { email: account.email }, //key 값이 server req.body(객체) 의 key값이랑 같아야 한다!!!!!!!
      //post로 줬을때만 body로 전달가능
    })
      .then((res) => {
        setIsEmailOk(true); //200이면 사용가능하므로 true
        setDisable(false);
        alert("사용 가능한 이메일입니다.");
        console.log(res);
      })
      .catch((e) => {
        setIsEmailOk(false);
        alert("이미 사용 중인 이메일입니다.");
        console.log(e);
      });
  };

  //제출할 때
  const onSubmit = (data) => {
    console.log(data);

    //전화번호가 숫자인지 체크하기
    if (isNaN(data.phone)) {
      alert("전화번호는 숫자만 입력해주세요.");
      document.querySelector("#regPhone").value = ""; //잘못적으면 빈칸
    } else if (isNickOk === false || isEmailOk === false) {
      //활동명,이메일 중복체크 안하면 진행 안되게
      alert("활동명이나 이메일 중복확인을 해주세요.");
    }
    //input에 값이 있는지 체크하고 입력이 다 돼있으면 post전송
    else if (
      data.regName !== "" &&
      data.nick !== "" &&
      data.password !== "" &&
      data.phone !== "" &&
      data.email !== ""
    ) {
      addMember(data);
    }
  };

  function addMember(data) {
    axios({
      method: "POST",
      url: `api/auth/register`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        alert("회원가입 성공! ૮ ♡ﻌ♡ა");
        navigate("/");
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <body>
        <div className="regContainer">
          <div className="mainBox">
            <div className="logo">
              <img src={Logo} alt="펫스 로고 사진" />
            </div>
            <div className="regBox">
              <form
                className="register"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="regRowWrap">
                  <input
                    type="text"
                    placeholder="이름"
                    className="regInput"
                    name="regName"
                    id="name"
                    autoComplete="off"
                    {...register("regName")}
                    onChange={onChangeAccount}
                  />
                  {errors.regName && <p>{errors.regName.message}</p>}
                </div>
                <div className="regRowWrap" id="emailWrap">
                  {/* 겹치는 활동명이면 겹친다고 말해주고 다시 바로 지워지게 만들기 */}
                  <div>
                    <input
                      type="text"
                      placeholder="활동명"
                      name="nick"
                      id="regNick"
                      className="regInput"
                      autoComplete="off"
                      {...register("nick")}
                      onChange={onChangeAccount}
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      value="중복확인"
                      className="regInput"
                      id="NickCheck"
                      autoComplete="off"
                      onClick={nickCheck}
                    />
                  </div>
                  {errors.nick && <p>{errors.nick.message}</p>}
                </div>
                <div className="regRowWrap">
                  <input
                    type="password"
                    placeholder="비밀번호"
                    className="regInput"
                    id="password"
                    name="password"
                    autoComplete="off"
                    {...register("password")}
                    onChange={onChangeAccount}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="regRowWrap">
                  <input
                    type="password"
                    placeholder="비밀번호 재확인"
                    className="regInput"
                    name="passwordConfirm"
                    autoComplete="off"
                    {...register("passwordConfirm")}
                    onChange={onChangeAccount}
                  />
                  {errors.passwordConfirm && (
                    <p>{errors.passwordConfirm.message}</p>
                  )}
                </div>
                <div className="regRowWrap">
                  <input
                    type="text"
                    placeholder="전화번호"
                    className="regInput"
                    id="regPhone"
                    name="phone"
                    autoComplete="off"
                    {...register("phone")}
                    onChange={onChangeAccount}
                  />
                  <div style={{ fontSize: "12px", color: "grey" }}>
                    * 특수기호 없이 010부터 숫자만 입력해 주세요.
                  </div>
                  {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <div className="regRowWrap" id="emailWrap">
                  <div>
                    <input
                      type="email"
                      placeholder="이메일"
                      className="regInput"
                      id="regEmail"
                      name="email"
                      autoComplete="off"
                      {...register("email")}
                      onChange={onChangeAccount}
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      value="인증번호 받기"
                      className="regInput"
                      id="certification"
                      autoComplete="off"
                      onClick={emailCheck}
                    />
                  </div>
                  {errors.email && (
                    <p className="emailMsg">{errors.email.message}</p>
                  )}
                </div>

                <div className="regRowWrap">
                  <input
                    type="text"
                    placeholder="인증번호를 입력하세요"
                    className="regInput"
                    id="chkCert"
                    name="emailnumber"
                    disabled={disable}
                    //true면 비활성화
                  />
                </div>
                <div className="regRowWrap">
                  <input
                    type="submit"
                    value="회원가입"
                    className="regInput"
                    id="regBtn"
                  />
                </div>
                <div className="mvLog">
                  <a href="/">계정이 이미 있으신가요? 로그인</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Register;
