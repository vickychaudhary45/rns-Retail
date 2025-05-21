import Head from "next/head";
import React from "react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Career = ({ jobData, seoHomePageData }) => {
  return (
    <>
      <React.Fragment>
        {/* <Head>
          <title>Career | Whizlabs</title>
        </Head> */}
        {/* <!-- banner-part --> */}
        <div
          className="careers-banner"
          style={{
            background: "#FFF4F2 url('/images/carrers-banner-patten.svg') center",
            backgroundSize: "cover",
          }}
        >
          <div className="container-small">
            <div className="content">
              <span>Careers</span>
              <h1>Let’s start something big together.</h1>
            </div>
          </div>
        </div>

        {/* <!-- content area part -->  */}
        <div id="content-area" className="careers-page">
          <div className="technical-block">
            <div className="container-small">
              <figure>
                <img className="img-full" src="/images/technical-block-img2x.jpg" alt="" />
              </figure>
              <div className="heading">
                <h2>
                  Our roots are technical, our passion is contagious, and our people are the best.
                </h2>
                <span>Sounds interesting? Join the family!</span>
              </div>

              <div className="job-position">
                <div className="position-heading">
                  <div className="title">Open Positions</div>
                  <div className="total-position">{jobData.length} Job openings</div>
                </div>
                {jobData.length > 0 ? (
                  <div className="job-list-block">
                    {jobData.map((job) => (
                      <div className="block" key={job.id}>
                        <div className="left">
                          <div className="job-title">{job?.position_title}</div>
                          <span>
                            {job.max_exp == null ? (
                              <>{job.min_exp}</>
                            ) : (
                              <>
                                {job.min_exp} - {job.max_exp} Years Experience
                              </>
                            )}
                          </span>
                        </div>
                        <div className="right">
                          <a
                            className="link-more-info"
                            href={"/careers/" + job.slug}
                            target="_blank"
                          >
                            <span>more info</span>
                            <i className="icon icon-font-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="job-list-block">
                    <h5 style={{ textAlign: "center", margin: "1.5em 0" }}>
                      No open positions available right now. Please check back later.
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="culture-values-block">
            <div className="container-small">
              <div className="left">
                <h3>Culture & Values</h3>
                <p>
                  Our values and culture are the identity of our company and define what we are. The
                  management has finalized a set of values to help employees in achieving their
                  goals as well as the company’s objectives.{" "}
                </p>
              </div>
              <div className="right">
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <div className="title">Quality</div>
                    <span>What we do, we do the best</span>
                  </li>
                  <li>
                    <div className="title">Passion</div>
                    <span>Committed to success by brain and heart</span>
                  </li>
                  <li>
                    <div className="title">Accountability</div>
                    <span>If it’s to be, it’s up to me</span>
                  </li>
                  <li>
                    <div className="title">Leadership</div>
                    <span>Courage to lead by helping others</span>
                  </li>
                </ul>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <div className="title">Collaboration</div>
                    <span>Collecting all genius all together</span>
                  </li>
                  <li>
                    <div className="title">Diversity</div>
                    <span>Assortment of culture with a common goal</span>
                  </li>
                  <li>
                    <div className="title">Integrity</div>
                    <span>Being real and authentic</span>
                  </li>
                  <li>
                    <div className="title">Customer Success</div>
                    <span>Making customer happy and satisfied</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="perks-benifits-block">
            <div className="container-small">
              <div className="img-group">
                <figure>
                  <img className="img-full" src="/images/carrers-img12x.jpg" alt="" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/carrers-img22x.jpg" alt="" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/carrers-img32x.jpg" alt="" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/carrers-img42x.jpg" alt="" />
                </figure>
              </div>
              <div className="heading">
                <h4>Perks and Benefits</h4>
                <p>
                  Your performance is outstanding only when you are satisfied. We have made our
                  Whizlabs family with love and support; to see our family more than happy, we
                  provide them a home-like environment at work. To support you, we provide:
                </p>
              </div>
              <div className="block-group">
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/compansastion.svg" alt="" />
                  </figure>
                  <div className="title">Employee recognition and rewards</div>
                  <p>
                    Recognizing and rewarding employees for their hard work and achievements can
                    improve employee morale and motivation. Consider offering bonuses, promotions,
                    and other incentives to show your appreciation.
                  </p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/helth-insurance.svg" alt="" />
                  </figure>
                  <div className="title">Health Insurance</div>
                  <p>Whizlabs have health insurance for you and your kids.</p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/insectives-bonus.svg" alt="" />
                  </figure>
                  <div className="title">Incentives and Bonus</div>
                  <p>We encourage people hard work through incentives and bonus. </p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/take-off-policy.svg" alt="" />
                  </figure>
                  <div className="title">Vacation, Take-off policy</div>
                  <p>
                    We always believe in a healthy work/life balance. Our company offers paid
                    vacation, and outings, for full-time employees.
                  </p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/daily-food.svg" alt="" />
                  </figure>
                  <div className="title">Daily Food Allowance</div>
                  <p>
                    No one can work with an empty stomach! Right? We offer healthy home-cooked-style
                    meals for free!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export const getServerSideProps = async () => {
  let jobData = [];
  const seoHomePageData = {
    seoPageType: "career",
    title: "Career | Whizlabs",
    metaTags: [{ name: "", property: "", content: "" }],
  };
  try {
    // let positionResponse = await axios.get(baseUrl + "/web/career-positions");
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
        {
          position_title: "Sales Development Lead",
          department: 7,
          job_type: 1,
          min_exp: "5",
          max_exp: 10,
          open_positions: 1,
          roles_responsibilities:
            '<ul>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation"><strong>Outbound Outreach:</strong></p>\n</li>\n<ul>\n<li>Identify and research potential B2B customers in the US and Europe who align with the ideal customer profile.</li>\n<li>Utilize tools like LinkedIn Sales Navigator, Apollo, and other data sources to gather contact information.</li>\n<li>Execute multi-channel outreach campaigns, including cold calling, cold emailing, and social selling (e.g., LinkedIn).</li>\n<li>Craft outreach messages that resonate with the target audience and industry.</li>\n<li>Engage prospects through strategic, value-driven communication to generate interest.</li>\n</ul>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation"><strong>Appointment Setting and Lead Nurturing:</strong></p>\n</li>\n<ul>\n<li>Schedule meetings, demos, or discovery calls with qualified leads for the sales team.</li>\n<li>Coordinate with the sales team to ensure a smooth handover of qualified leads.</li>\n<li>Follow up with prospects to confirm meetings and provide necessary information.</li>\n<li dir="ltr" role="presentation">Engage with leads who are not yet ready to buy through regular follow-ups and sharing of relevant content.</li>\n</ul>\n</ul>\n<ul>\n<li dir="ltr" aria-level="1">\n<p dir="ltr" role="presentation"><strong>Market Research &amp; Intelligence:</strong></p>\n<ul>\n<li>Conduct thorough market research to identify key industries, potential clients, and emerging trends, ensuring tailored outreach that resonates with target audiences.</li>\n</ul>\n<p>&nbsp;</p>\n</li>\n</ul>',
          minimum_qualifications:
            "<ul>\n<li>Bachelor&rsquo;s or Master&rsquo;s degree in business, marketing, or a related field.</li>\n<li>Familiarity with tools like LinkedIn Sales Navigator, Apollo, and CRM software.</li>\n<li>Excellent communication and interpersonal skills.</li>\n<li>Ability to work independently and build a team from scratch.</li>\n<li>Strong analytical and problem-solving abilities.</li>\n<li>Proven success in US and/or European markets..</li>\n</ul>",
          status: 1,
          created_by: 4,
          created_at: "2024-09-25T03:48:37.000Z",
          updated_at: "2024-09-25T06:00:02.000Z",
          id: 265,
          slug: "sd-lead",
          about_whizlabs:
            "<p>Founded in 2000 by serial entrepreneurs who hailed from IIT Delhi. We are India&rsquo;s one of the leading certification training providers, also awarded the ' Most Innovative Indian IT Company&rsquo; award by NASSCOM in 2004 . We are one of the first in the industry to launch online training for various technologies.</p>\n<p>Based in Bangalore, Coimbatore and New Delhi (India), we have helped over 5 Million professionals and companies across 150+ countries to get trained, pass certifications, and helped them to succeed in their careers.</p>",
          order_by: 12,
          expired_at: null,
        },
      ],
    };
    if (positionResponse && positionResponse.data && positionResponse.data) {
      jobData = positionResponse.data;
      jobData.sort((a, b) => {
        return a.order_by - b.order_by;
      });
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: { jobData, seoHomePageData },
  };
};

export default Career;
