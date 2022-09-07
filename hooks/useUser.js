import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const useUser = (redirect) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authentication: token,
        },
      };
      axios
        .get("/api/user", config)
        .then((res) => {
          const userType = res.data.userType;
          if (userType === "admin") {
            setUser({ userType });
            setLoading(false);
          } else {
            router.push(redirect.redirectTo);
          }
        })
        .catch((err) => {
          router.push(redirect.redirectTo);
          console.log(err);
        });
    } else {
      router.push(redirect.redirectTo);
    }
  }, []);

  return [user, loading];
};

export default useUser;
