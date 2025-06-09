import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

interface Payment {
  id: number;
  clientName: string;
  amount: number;
  method: string;
  status: "Pending" | "Completed" | "Failed";
  date: string;
}

const ManagePayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, clientName: "Alice Johnson", amount: 50, method: "Credit Card", status: "Completed", date: "2025-06-01" },
    { id: 2, clientName: "Bob Williams", amount: 30, method: "Cash", status: "Pending", date: "2025-06-10" },
  ]);

  const handleStatusChange = (id: number, newStatus: Payment["status"]) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 900, padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Manage Payments
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Client</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Method</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.clientName}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Select
                    value={payment.status}
                    onChange={(e) =>
                      handleStatusChange(payment.id, e.target.value as Payment["status"])
                    }
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ManagePayments;
