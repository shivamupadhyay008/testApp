import "./App.css";

import { BsFillClockFill, BsCalendarEvent } from "react-icons/bs";
import * as yup from "yup";
import { FaGlobeAmericas } from "react-icons/fa";
import {
  Box,
  Button,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function App() {
  const [success, setSuccess] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    name: yup
      .string()
      .required("Name is required.")
      .min(4, "name is too short - should be 4 chars minimum."),
    description: yup.string().notRequired(),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = methods;
  const handleEvent = () => {
    setSuccess(true);
  };
  console.log("hii", errors);
  const values = getValues();
  console.log(values);
  return (
    <div className="App">
      <Grid container sx={{ flexDirection: isMobile ? "column" : "row" }}>
        <Box class="description-section">
          <Box>
            <h4 className="scheduler gray">Gourav garg</h4>
            <h2 className="event">15 Minute Meeting</h2>
            <div className="icon-text-div scheduler gray">
              <BsFillClockFill className="icons" />
              <h4>15 min</h4>
            </div>
            <div className="icon-text-div scheduler gray">
              <Box>
                <BsCalendarEvent className="icons " />
              </Box>
              <h4>9:00 am - 9:15am, Friday, September, 16, 2022</h4>
            </div>
            <div className="icon-text-div scheduler gray">
              <Box>
                <FaGlobeAmericas className="icons" />
              </Box>
              <h4>Indian Standard Time</h4>
            </div>
          </Box>
        </Box>

        <Divider
          variant="fullWidth"
          orientation={isMobile ? "horizontal" : "vertical"}
          flexItem
        />

        <Box sx={{ flex: 2 }} className="description-section">
          <form onSubmit={handleSubmit(handleEvent)}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "800",
                color: "darkslategray",
                mb: 3,
              }}
            >
              Enter Details
            </Typography>
            <Box>
              <Typography
                variant="body1"
                fontWeight="800"
                mb={1}
                color="darkslategray"
              >
                Name*
              </Typography>
              <TextField
                name="name"
                {...register("name")}
                fullWidth
                placeholder="Name *"
              />
              <Typography variant="caption" color="red" fontWeight="800" mb={1}>
                {errors?.name?.message}
              </Typography>
            </Box>
            <Box>
              <FormGroup>
                <Typography
                  variant="body1"
                  fontWeight="800"
                  mb={1}
                  mt={3}
                  color="darkslategray"
                >
                  Email*
                </Typography>
                <TextField
                  mb={1}
                  fullWidth
                  name="email"
                  {...register("email")}
                  placeholder="Email *"
                  type="email"
                  id="margin-none"
                />
                <Typography
                  variant="caption"
                  color="red"
                  fontWeight="800"
                  mb={1}
                >
                  {errors?.email?.message}
                </Typography>
              </FormGroup>
              <Button
                variant="outlined"
                sx={{ borderRadius: 8, mt: 1, fontWeight: 500 }}
              >
                Add Guests
              </Button>
            </Box>
            <Typography
              variant="body1"
              fontWeight="800"
              mb={1}
              mt={3}
              color="darkslategray"
            >
              Please share anything that will help us improve our meeting.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              name="description"
              maxRows={4}
              {...register("description")}
              id="margin-none"
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ borderRadius: 8, my: 1 }}
            >
              <Typography variant="body1" my={1} fontWeight="800">
                Schedule Event
              </Typography>
            </Button>
          </form>
        </Box>
      </Grid>
      <EventDialog
        handleClose={() => {
          setSuccess(false);
        }}
        open={success}
        title={"Confirmed"}
      >
        <Box sx={{ flex: 2, mt: 0 }} className="description-section">
          <h4 className="scheduler">
            Your Meeting is scheduled with Gourav garg
          </h4>
          {values?.name ? (
            <h4 className="scheduler">Name:{values.name}</h4>
          ) : (
            ""
          )}
          {values?.email ? (
            <h4 className="scheduler">email:{values.email}</h4>
          ) : (
            ""
          )}
          {values?.description ? (
            <h4 className="scheduler">description:{values.description}</h4>
          ) : (
            ""
          )}
        </Box>
      </EventDialog>
    </div>
  );
}
function EventDialog({ handleClose, open, title, children }) {
  return (
    <Dialog fullWidth closeButton onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "800",
            color: "darkslategray",
          }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
