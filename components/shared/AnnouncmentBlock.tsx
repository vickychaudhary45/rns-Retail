import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const AnnouncmentBlock = ({ staticpage, headless, subscribedUser }) => {
  const router = useRouter();
  const pathName = router.pathname;
  const [banner, setBanner] = useState("");
  const [openStatus, setOpenStatus] = useState(true);

  useEffect(() => {
    let isMounted = true;

    axios.get(baseUrl + "/web/banner").then((resp) => {
      if (isMounted) {
        resp.data.data.forEach((item) => {
          if (item.display_type == "top_bar") {
            setBanner(item.offer);
          }
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const close = (e) => {
    e.preventDefault();
    setOpenStatus(false);
  };

  return (
    <div style={{
      height:openStatus ?  "fit-contain" : "0px",
    }}>
      {!pathName.includes("/lifetime-membership") &&
        !staticpage &&
        !headless &&
        !subscribedUser &&
        banner &&
        openStatus && (
          <div className="annoucement-block">
            <div className="container">
              <p dangerouslySetInnerHTML={{ __html: banner }} />
              {!pathName.includes("/pricing") && (
                <div className="icon-close icon-font-cross" onClick={close}></div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default AnnouncmentBlock;
