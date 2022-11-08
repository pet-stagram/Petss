import React from 'react'

function SearchUser() {

    const [a, setA] = useState("hi");
    const callApi = async () => {
      /* src/setupProxy.js 파일에 proxy 설정해놓음. 
      만약에 api주소가 /auth 라면, /api/auth 로 요청하기 */
      axios.get("/api/auth/login").then((res) => {
        setA(res.data.test);
      });
    };
    useEffect(() => {
      callApi();
    }, []);


  return (
    <div>

    </div>
  )
}

export default SearchUser