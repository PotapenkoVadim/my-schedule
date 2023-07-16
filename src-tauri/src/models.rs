use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Deserialize, Serialize, Clone)]
pub struct Order {
    pub id: String,
    pub color: String,
    pub customer: String,
    pub set: String,
    pub deadline: Vec<String>,
    pub comment: String,
    pub done: bool,
    pub details: Vec<OrderDetails>
}

#[derive(Default, Debug, Deserialize, Serialize, Clone)]
pub struct OrderDetails {
    pub count: String,
    pub description: String,
    pub sum: String
}