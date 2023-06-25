// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Deserialize, Serialize)]
struct Order {
    id: String,
    color: String,
    customer: String,
    set: String,
    deadline: Vec<String>,
    comment: String,
    done: bool,
    details: Vec<OrderDetails>
}

#[derive(Default, Debug, Deserialize, Serialize)]
struct OrderDetails {
    count: String,
    description: String,
    sum: String
}

#[tauri::command]
fn add_order(order: Order) {
    println!("{:#?}", order);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_order])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


// *** ENDPOINTS *** //
// TODO: add order
// TODO: remove order
// TODO: change order