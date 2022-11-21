import React from "react";
import Logo from "../../images/regLogo.png";
import "./register.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
  const formSchema = yup.object({
    regName: yup.string().required("이름을 입력해주세요"),
    nick: yup.string().required("활동명을 입력해주세요"),
    phone: yup.string().required("전화번호를 입력해주세요"),
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요")
      .min(8, "최소 8자 이상 가능합니다.")
      .max(30, "최대 30자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  //mode를 onTouched로 해줘야 input focusout때마다 유효성 검사된다.
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => console.log(data);
  //입력값 data에 저장되는 것 확인

  //db 연동
  useEffect(() => {
    axios
      .post("http://localhost:5100/auth/register")
      .then((res) => console.log(res).catch());
  });

  return (
    <>
      <div className="regContainer">
        <div className="mainBox">
          <div className="logo">
            <img src={Logo} alt="펫스 로고 사진" />
          </div>
          <div className="regBox">
            <form
              className="register"
              method="post"
              action="http://localhost:5100/auth/register"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* maxlength정하고(db랑 맞춰야하겠지?) 모든 입력칸 필수 입력으로 만들고 인풋 칸 밑에 경고글씨 띄우기
                      해당 인풋칸을 눌렀다가 벗어날 때 입력확인, 중복검사 되도록, 그에 맞춰서 경고글씨 바뀜 */}
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
                />
                {errors.nick && <p>{errors.nick.message}</p>}
              </div>
              {/* 비밀번호 규칙 db에 맞춰서 넣기  */}
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
              {/* 재입력 할 때 위에 입력한 값과 비교하기  */}
              <div className="regRowWrap">
                <input
                  type="text"
                  placeholder="휴대폰 번호"
                  className="regInput"
                  name="phone"
                  autoComplete="off"
                  {...register("phone")}
                />
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
                    type="submit"
                    value="인증번호 받기"
                    className="regInput"
                    id="certification"
                    autoComplete="off"
                  />
                </div>
                {errors.email && (
                  <p className="emailMsg">{errors.email.message}</p>
                )}
                {/* 인증번호 받기 눌렀을 때 db에 존재하는 이메일이면 "이미 존재하는 이메일 입니다" 글자 띄우고 
                          인증가능한 이메일이면 "인증번호가 전송되었습니다 ". 
                          비활성화된 인증번호 입력칸 활성화 되고 회원가입 버튼 누를때 인증번호 일치하는지 검사 
                          인증번호 틀렸을 시 띄우는 팝업창도 필요함. 성공하면  "인증에 성공하였습니다. " 하고 넘어가야함.
                          인증번호는 6자리 이고 한 칸씩 입력하게 만든다. 인증번호 입력하는 창 자체를 팝업으로 띄우는 게 나을듯. 문자인증 처럼..
                         아니면 처음부터 인증번호 입력 칸 만들고 비활성화에서 인증번호 받으면 -> 활성화 하게 
                         인증번호 session 폴더에 저장(백앤드),번호 다르면 400에러 띄우게 하심 
                         다시 시도 요청, 번호 같으면 200띄움. */}
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
                  disabled={errors || watch()}
                />
              </div>
              <div className="mvLog">
                <a href="/login">계정이 이미 있으신가요? 로그인</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
