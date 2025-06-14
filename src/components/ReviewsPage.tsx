import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Paper, List, ListItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon import
import axios from "axios";
import toast from "react-hot-toast";

interface Review {
  id: number;
  name: string;
  comment: string;
}

export default function ReviewsPage() {
  const { serviceName } = useParams<{ serviceName: string }>();
  const {serviceId} = useParams<{ serviceId: string }>(); // Get serviceId from URL params
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate(); // Navigate hook for redirecting to profile

  const handleAddReview = () => {
    if (!name || !comment) {
      alert("Please fill in both fields.");
      return;
    }

    const newReview = {
      name,
      comment,
      serviceId: parseInt(serviceId || "0"),
    };
    console.log("Adding review:", newReview);

    // Post the new review to the backend
    axios.post(`http://localhost:3000/reviews/${serviceId}`, newReview)
      .then((response) => {
        console.log("Review added:", response.data);
        setReviews([...reviews, response.data]); // Update state with new review
        toast.success("Review added successfully!");
        setName(""); // Clear input fields
        setComment("");
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  // get reviews from the db
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/reviews/${serviceId}`);
      console.log("Fetched reviews:", response.data);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  // Fetch reviews when the component mounts
  useEffect(() => {
    fetchReviews();
  }, [serviceId]);

  // Handle Profile Button click
  const handleProfileClick = () => {
    navigate("/profile"); // Redirect to Profile page
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      {/* Profile Button */}
      <IconButton
        sx={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#1976d2",
          color: "white",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
        onClick={handleProfileClick}
      >
        <AccountCircleIcon />
      </IconButton>

      <Paper elevation={3} sx={{ p: 4, width: "90%", maxWidth: "800px", borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reviews for {serviceName}
        </Typography>

        {/* Review List */}
        {reviews.length > 0 ? (
          <List>
            {reviews.map((review) => (
              <ListItem key={review.id}>
                <Card sx={{ width: "100%", p: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{review.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography align="center" color="textSecondary">
            No reviews yet.
          </Typography>
        )}

        {/* Add Review Form */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Add Your Review</Typography>
          <TextField
            label="Your Name"
            fullWidth
            sx={{ mt: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Your Review"
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddReview}>
            Submit Review
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
