import React from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
import { useState } from "react";
import Footer from "../footer/Footer";
import { useUserState } from "../../ContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

function EditProfile() {
  //수정해서 db에 보내기, 활동명과 이메일 중복 검사

  //textarea 입력값 감지
  const [textValue, setTextValue] = useState("");
  const [userState] = useUserState();

  const handlesetValue = (e) => {
    setTextValue(e.target.value);
  };

  console.log(userState);

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

  const onSubmit = (data) => {
    console.log(data);
    if (
      data.regName !== "" &&
      data.nick !== "" &&
      data.phone !== "" &&
      data.email !== ""
    ) {
      updateMember(data);
    }
  };

  function updateMember(data) {
    axios({
      method: "POST",
      url: `api/users/info`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        alert("정보가 수정되었습니다.");
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return userState ? (
    <div>
      <body>
        {/* 프로필 사진, 이름, 활동명, 소개, 이메일, 전화번호, 비밀번호 변경 -> 이전비번,새비번,새비번 확인,비밀번호 찾기   
          프로필 사진 로그인한 정보 가져오기
        */}
        <div className="editContainer">
          <div className="navbarWrap">
            <Navbar />
          </div>
          <div className="editAccountWrap">
            <div className="editAccountBox">
              <div className="editRow" id="rowTop">
                <div className="left">
                  <div>
                    <button className="editPhotoBtn" id="edPhBtn">
                      <div className="editImgWrap">
                        <img
                          alt="본인 프로필 사진"
                          className=""
                          src={userState.info.image}
                        ></img>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="right">
                  <h1>{userState.info.nick}</h1>
                  <button className="" type="button" id="profileChnBtn">
                    프로필 사진 바꾸기
                  </button>
                </div>
              </div>
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="editRow">
                  <aside>
                    <label>이름</label>
                  </aside>
                  <div>
                    <input
                      type="text"
                      name="regName"
                      defaultValue={userState.info.name}
                      {...register("regName")}
                    ></input>
                    {errors.regName && (
                      <p className="editMsg">{errors.regName.message}</p>
                    )}
                  </div>
                </div>
                <div className="editRow">
                  <aside>
                    <label>활동명</label>
                  </aside>
                  <div>
                    <input
                      type="text"
                      name="nick"
                      defaultValue={userState.info.nick}
                      {...register("nick")}
                    ></input>
                    {errors.nick && (
                      <p className="editMsg">{errors.nick.message}</p>
                    )}
                  </div>
                </div>
                <div className="editRow" id="rowIntroduce">
                  <aside>
                    <label>소개</label>
                  </aside>
                  <div>
                    <div>
                      <textarea
                        id="editTextarea"
                        maxLength="149"
                        value={textValue}
                        onChange={(e) => handlesetValue(e)}
                        placeholder={userState.info.self_intro}
                      ></textarea>
                      <div style={{ display: "flex" }}>
                        <p>{textValue.length}</p>/<p>150</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="editRow" id="editRowEmail">
                  <aside>
                    <label>이메일</label>
                  </aside>
                  <div>
                    <input
                      type="text"
                      defaultValue={userState.info.email}
                      name="email"
                      {...register("email")}
                    ></input>
                    {errors.email && (
                      <p className="editMsg">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="editRow" id="editEmailCheck">
                  <aside>
                    <label></label>
                  </aside>
                  <div>
                    <button type="button">이메일 확인</button>
                  </div>
                </div>
                <div className="editRow">
                  <aside>
                    <label>전화번호</label>
                  </aside>
                  <div>
                    <input
                      type="text"
                      defaultValue={userState.info.phone}
                      name="phone"
                      {...register("phone")}
                    ></input>
                    {errors.phone && (
                      <p className="editMsg">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div className="editRow">
                  <aside>
                    <label>새 비밀번호</label>
                  </aside>
                  <div>
                    <input
                      type="text"
                      name="passwordConfirm"
                      {...register("passwordfConfirm")}
                    ></input>
                  </div>
                </div>
                <div className="editRow">
                  <aside>
                    <label>새 비밀번호 확인</label>
                  </aside>
                  <div>
                    <input
                      className=""
                      type="text"
                      placeholder=""
                      name=""
                    ></input>
                  </div>
                </div>
                <div className="editRow" id="editSubmit">
                  <aside>
                    <label></label>
                  </aside>
                  <input type="submit" value="수정"></input>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </div>
  ) : (
    ""
  );
}

export default EditProfile;
