// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;
mod models;

use models::Order;
use utils::{get_data, write_data, filter_orders_by_year};

#[tauri::command]
fn add_order(order: String) {
    let order_data = serde_json::from_str(&order).unwrap();
    let mut data = get_data();
    data.push(order_data);

    write_data(data);
}

#[tauri::command]
fn get_orders(year: i32) -> String {
    let orders = get_data();
    let filtered_orders: Vec<Order> = filter_orders_by_year(&orders, year);

    serde_json::to_string(&filtered_orders).unwrap()
}

#[tauri::command]
fn remove_order(order_id: String) {
    let mut data = get_data();
    if let Some(index) = data.iter().position(|order| order.id == order_id) {
        data.remove(index);
    }

    write_data(data);
}

#[tauri::command]
fn change_order(order_id: String, updated_order: String) {
    let new_order: Order = serde_json::from_str(&updated_order).unwrap();
    let mut data = get_data();
    if let Some(order) = data.iter_mut().find(|obj| obj.id == order_id) {
        order.id = new_order.id;
        order.color = new_order.color;
        order.customer = new_order.customer;
        order.set = new_order.set;
        order.deadline = new_order.deadline;
        order.comment = new_order.comment;
        order.done = new_order.done;
        order.details = new_order.details;
    }

    write_data(data);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_order, get_orders, remove_order, change_order])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
