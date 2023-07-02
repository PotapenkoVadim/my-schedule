// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::{fs::{self, File}, path::Path, io::Read};
use serde_json::to_writer;

const DATA_DIR: &str = "d:\\bin\\my-shedule\\"; 
const DATA_FILE: &str = "data.json";

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
fn add_order(order: String) -> String {
    let order_data = serde_json::from_str(&order).unwrap();
    let mut data = get_data();
    data.push(order_data);

    write_data(data);
    serde_json::to_string(&get_data()).unwrap()
}

#[tauri::command]
fn get_orders() -> String {
    serde_json::to_string(&get_data()).unwrap()
}

#[tauri::command]
fn remove_order(order_id: String) -> String {
    let mut data = get_data();
    if let Some(index) = data.iter().position(|order| order.id == order_id) {
        data.remove(index);
    }

    write_data(data);
    serde_json::to_string(&get_data()).unwrap()
}

#[tauri::command]
fn change_order(order_id: String, updated_order: String) -> String {
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
    serde_json::to_string(&get_data()).unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_order, get_orders, remove_order, change_order])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn write_data(data: Vec<Order>) {
    fs::create_dir_all(DATA_DIR).unwrap();

    let file = File::create(DATA_DIR.to_owned() + &DATA_FILE.to_owned()).unwrap();
    to_writer(file, &data).unwrap();
}

fn get_data() -> Vec<Order> {
    let mut data: Vec<Order> = Vec::new();

    let path_str = DATA_DIR.to_owned() + &DATA_FILE.to_owned();
    let path = Path::new(&path_str);
    if !path.exists() {
        return data;
    }

    let mut file = File::open(path).unwrap();
    let mut content = String::new();
    file.read_to_string(&mut content).unwrap();

    data = match serde_json::from_str(&content) {
        Ok(data) => data,
        Err(_) => Vec::new()
    };

    data
}