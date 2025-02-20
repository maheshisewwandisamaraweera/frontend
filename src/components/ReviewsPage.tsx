import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Paper, List, ListItem,  } from "@mui/material";

interface Review {
  id: number;
  name: string;
  comment: string;
}

export default function ReviewsPage() {
  const { serviceName } = useParams<{ serviceName: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleAddReview = () => {
    if (name && comment) {
      const newReview = { id: reviews.length + 1, name, comment };
      setReviews([...reviews, newReview]);
      setName("");
      setComment("");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
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
          <TextField label="Your Name" fullWidth sx={{ mt: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Your Review" fullWidth multiline rows={3} sx={{ mt: 2 }} value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddReview}>
            Submit Review
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
