// src/App.js
import React from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import {
  FaGift,
  FaSyncAlt,
  FaBan,
  FaFileInvoice,
  FaInfinity,
  FaMoneyBillWave,
  FaCreditCard,
  FaEnvelope,
  FaHeadset,
  FaChalkboardTeacher,
  FaBriefcase,
  FaLayerGroup,
} from "react-icons/fa";
import { tokens } from "../../theme";

const Support = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* Main Dashboard Content */}
        {/* <div className=" flex-1 p-2 my-2 " style={{ border: "1px solid red" }}> */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 m-4">
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaGift />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Is there a free trial available?
              </Typography>
              <Typography>
                Yes, you can try us for free for 30 days. If you want, we'll
                provide you with a free 30-minute onboarding call to get you up
                and running.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaSyncAlt />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Can I change my plan later?
              </Typography>
              <Typography>
                Of course you can! Our pricing scales with your company. Chat to
                our friendly team to find a solution that works for you as you
                grow.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaBan />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                What is your cancellation policy?
              </Typography>
              <Typography>
                We understand that things change. You can cancel your plan at
                any time and we’ll refund you the difference already paid.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaFileInvoice />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Can other info be added to an invoice?
              </Typography>
              <Typography>
                At the moment, the only way to add additional information to
                invoices is to add the information to the workspace’s name
                manually.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaInfinity />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                What does 'lifetime access' mean?
              </Typography>
              <Typography>
                Once you have purchased the UI kit, you will have access to all
                of the future updates, free of charge. We’ll let you know about
                releases.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaMoneyBillWave />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Is it a one-time payment?
              </Typography>
              <Typography>
                Just a one-time payment! No recurring charges or surprises, we
                promise. We’re just as sick of recurring charges as you are.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaMoneyBillWave />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Is it a one-time payment?
              </Typography>
              <Typography>
                Just a one-time payment! No recurring charges or surprises, we
                promise. We’re just as sick of recurring charges as you are.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaCreditCard />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                How does billing work?
              </Typography>
              <Typography>
                Plans are per workspace, not per account. You can upgrade one
                workspace, and still have any number of free workspaces.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaEnvelope />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                How do I change my account email?
              </Typography>
              <Typography>
                You can change the email address associated with your account by
                going to untitledui.com/account from a laptop or desktop.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaHeadset />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                How does support work?
              </Typography>
              <Typography>
                If you’re having trouble with Untitled UI, we’re here to try and
                help via hello@untitledui.com. We’re a small team, but will get
                back to you soon.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaChalkboardTeacher />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Do you provide tutorials?
              </Typography>
              <Typography>
                Not yet, but we’re working on it! In the meantime, we’ve done
                our best to make it intuitive and we’re building our
                documentation page.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaBriefcase />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Can I use it for commercial projects?
              </Typography>
              <Typography>
                Of course! We’d love to see it. You can use this UI kit to build
                any type of commercial business, website, app, or project.
              </Typography>
            </Box>
          </div>
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              padding: "20px",
            }}
            className="shadow-md"
          >
            <Box className="text-purple-600 text-2xl mr-4">
              <FaLayerGroup />
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold ">
                Can I use it for multiple projects?
              </Typography>
              <Typography>
                Absolutely! You can use Untitled UI for as many projects as you
                like. Please read our License Agreement before purchasing.
              </Typography>
            </Box>
          </div>
        </div>

        {/* </div> */}
      </div>
      <Box
        className="m-4 p-6 rounded-lg shadow-md"
        style={{
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        }}
      >
        <p className="text-lg font-semibold mb-4 text-center md:text-left">
          Get notified when we launch
        </p>
        <p className="mb-4 text-center md:text-left">
          Stay up to date with the latest news, announcements, and articles.
        </p>
        <div className="flex flex-col md:flex-row">
          <input
            className="flex-1 p-3 border border-gray-300 rounded-t-lg
               md:rounded-l-lg md:rounded-t-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
            type="email"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          />
          <button className="bg-purple-500 text-white p-3 rounded-b-lg md:rounded-r-lg md:rounded-b-none">
            Subscribe
          </button>
        </div>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default Support;
