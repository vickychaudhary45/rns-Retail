import Head from "next/head";
import { useEffect } from "react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import FourOhFour from "pages/404";
import Link from "next/link";

const CareerDetail = ({ jobData, seoHomePageData }) => {
  useEffect(() => {
    document.querySelector("#wrapper").classList.add("carees-details-page");
  }, []);

  if (!jobData || !jobData.id) return <FourOhFour />;

  return (
    <>
      {/* <Head>
        <title>Career | Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div id="content-area">
        <div className="job-apply-block">
          <div className="container">
            <div className="left">
              <h1>{jobData.position_title}</h1>
              <p>{jobData.job_type == 1 ? "Full Time" : "Part Time"}</p>
            </div>
            <div className="right">
              <a href={"/careers/apply/" + jobData.slug}>
                <button className="btn btn-apply-job">Apply For This Job</button>
              </a>
            </div>
          </div>
        </div>
        <div className="container career_page_li">
          <h5>Role and Key Responsibilities</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: jobData.roles_responsibilities,
            }}
          ></div>
          <h5>Minimum Qualifications</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: jobData.minimum_qualifications,
            }}
          ></div>
          <h5>About Whizlabs</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: jobData.about_whizlabs,
            }}
          ></div>
          <Link legacyBehavior href={"/careers/apply/" + jobData.slug}>
            <button className="btn btn-apply-job">Apply For This Job</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.career;
  let jobData = null;
  const seoHomePageData = {
    seoPageType: "career",
    title: "Career | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };
  try {
    let positionResponse = {
      msg: "success",
      data: [
        {
          position_title: "Software Developers(React & Node Js)",
          department: 3,
          job_type: 1,
          min_exp: "3",
          max_exp: 12,
          open_positions: 4,
          roles_responsibilities:
            '<p dir="ltr"><strong><span style="color: #e67e23;">JOB DESCRIPTION: SENIOR SOFTWARE ENGINEER&nbsp;</span></strong></p>\n<p dir="ltr">Job Overview:<br>Whizlabs is looking for motivated and skilled Software Engineers with strong programming knowledge in React.js, Node.js, Express.js, and related technologies. If you are passionate about building scalable, high-quality applications and thrive in a collaborative environment, this role offers an excellent opportunity to advance your skills and make a meaningful impact.</p>\n<p dir="ltr">Responsibilities:</p>\n<ul>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Develop and maintain web applications using React.js, Node.js, Express.js, and related technologies.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Collaborate with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality solutions.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Write clean, efficient, and well-documented code, following best practices in software development.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Troubleshoot, debug, and optimize applications to ensure high performance and responsiveness.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Contribute to architectural decisions, code reviews, and process improvements to drive project success.</p>\n</li>\n</ul>\n<p>&nbsp;</p>\n<p dir="ltr">Benefits:</p>\n<ul>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Opportunity to work with experienced professionals in the cloud computing industry.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Hands-on experience with cutting-edge technologies.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Competitive compensation and benefits.</p>\n</li>\n</ul>\n<p dir="ltr">This role provides an excellent opportunity to expand your expertise in software development, deepen your skills with modern technologies like React.js and Node.js, and advance your career through hands-on experience in building scalable applications</p>\n<p dir="ltr">&nbsp;</p>\n<p>&nbsp;</p>',
          minimum_qualifications:
            '<p dir="ltr">Requirements:</p>\n<ul>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Experience: 2-5 years of hands-on experience with React.js, Node.js, Express.js, and related JavaScript frameworks.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Strong understanding of JavaScript, HTML, CSS, and RESTful API design.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Familiarity with version control systems (e.g., Git) and agile development methodologies.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Knowledge of database systems (SQL or NoSQL) is a plus.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Excellent problem-solving skills and a proactive approach to learning and adapting new technologies.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Strong communication skills and ability to work effectively in a team environment.</p>\n</li>\n</ul>\n<p dir="ltr">Nice-to-Have Skills:</p>\n<ul>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Experience with cloud services (e.g., AWS, Azure, Google Cloud) is a plus.</p>\n</li>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation">Familiarity with modern CI/CD pipelines and deployment practices.</p>\n</li>\n</ul>\n<p>&nbsp;</p>',
          status: 1,
          created_by: 496,
          created_at: "2024-12-13T04:14:47.000Z",
          updated_at: null,
          id: 298,
          slug: "applicationforsoftwaredeveloperrole",
          about_whizlabs:
            '<p dir="ltr">About Whizlabs:</p>\n<p dir="ltr">Whizlabs is a trusted leader in professional training, known for its commitment to excellence and innovation in e-learning. Our mission is to empower professionals with high-quality, affordable training that accelerates career growth and personal development. By making learning accessible and impactful, we help individuals advance their skills, achieve their professional goals, and uplift their lives. Join us in our journey to inspire success and drive meaningful change.</p>',
          order_by: 16,
          expired_at: null,
        },
      ],
    };
    // let positionResponse = await axios.get(baseUrl + "/web/career-positions", {
    //   params: {
    //     slug: slug,
    //   },
    // });

    if (
      positionResponse &&
      positionResponse.data &&
      positionResponse.data &&
      positionResponse.data[0]
    ) {
      jobData = positionResponse.data[0];
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: { jobData, seoHomePageData },
  };
};

export default CareerDetail;
