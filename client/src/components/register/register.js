import React, { useState, useEffect } from "react";
import Logo from "../../images/regLogo.png";
import "./register.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isNickDup, setIsNickDup] = useState(false);
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

  // const onSubmit = (data) => console.log(data);

  const navigate = useNavigate();

  // //입력값 감지
  // const onChange = (e) => {
  //   const { name, value } = e.target;
  // };

  //활동명 중복 체크,
  //중복이면 true, 사용가능하면 false일 때 제출 가능하게
  //코드 받아와서 200이면 false, 다른 코드면 true 코드받아오는 법 찾아보기
  const onBlur = (e) => {
    axios({
      method: "POST",
      url: `api/auth/nick`,
      data: { nick: e.target.value },
    })
      .then((res) => {
        console.log(res);
        setIsNickDup(false);
      })
      .catch((e) => {
        console.log(e);
        setIsNickDup(true);
      });
  };

  //제출할 때
  const onSubmit = (data) => {
    console.log(data);

    //전화번호가 숫자인지 체크하기
    if (isNaN(data.phone)) {
      alert("전화번호는 숫자만 입력해주세요.");
      document.querySelector("#regPhone").value = "";
      //잘못적으면 빈칸
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

  // const onClick = () => {
  //   console.log(data);
  // };

  //db랑 비교해서 중복여부 체크해야 하니 get도 해야 한다.
  //1.submit할 때 data를 db랑 비교(axios.get)해서 중복이면 글씨 변경하기
  async function addMember(data) {
    await axios({
      method: "POST",
      url: `api/auth/register`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        alert("회원가입 성공! ૮ ♡ﻌ♡ა");
        navigate("/login");
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
                  />
                  {errors.regName && <p>{errors.regName.message}</p>}
                </div>
                <div className="regRowWrap">
                  {/* 겹치는 활동명이면 겹친다고 말해주고 다시 바로 지워지게 만들기 */}
                  <input
                    type="text"
                    placeholder="활동명"
                    name="nick"
                    id="nick"
                    className="regInput"
                    autoComplete="off"
                    {...register("nick")}
                    onBlur={onBlur}
                  />
                  {errors.nick && <p>{errors.nick.message}</p>}
                  {isNickDup && <p>이미 사용중인 활동명 입니다</p>}
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
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      value="인증번호 받기"
                      className="regInput"
                      id="certification"
                      autoComplete="off"
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
                    disabled
                  />
                </div>
                <div className="regRowWrap">
                  <input
                    type="submit"
                    value="회원가입"
                    className="regInput"
                    id="regBtn"
                    // disabled={errors || watch()}
                  />
                </div>
                <div className="mvLog">
                  <a href="/login">계정이 이미 있으신가요? 로그인</a>
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
