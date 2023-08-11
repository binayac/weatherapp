<?php

header("Access-Control-Allow-Origin: *");

$apiKey = 'ea034a0aa96d41c030f1f99a0a52411e';

// Get the city name from the query string
$city = isset($_GET['city']) ? $_GET['city'] : 'Gateshead'; // Default to New York if not provided

// Construct the API URL
$apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey&units=metric"; // Use metric units

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute cURL session and get the response
$response = curl_exec($ch);

// Close cURL session
curl_close($ch);

// Parse JSON response
$data = json_decode($response, true);

// Check if data was successfully fetched
if ($data) {
    $weather = [
        'city' => $data['name'],
        'temperature' => $data['main']['temp'],
        'humidity' => $data['main']['humidity'],
        'wind' => $data['wind']['speed'],
        'pressure' => $data['main']['pressure'],
        'weather_condition' => $data['weather'][0]['description']
    ];

    // Insert data into the database
    $conn = new mysqli('127.0.0.1', 'root', '', 'weatherapp'); 
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "INSERT INTO weatherData (date, city, temperature, humidity, wind, pressure, weather_condition)
            VALUES (NOW(), '{$weather['city']}', '{$weather['temperature']}', '{$weather['humidity']}', '{$weather['wind']}', '{$weather['pressure']}', '{$weather['weather_condition']}')";
    
    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error inserting data into the database.']);
        $conn->close();
        exit;
    }
    
    $conn->close();

    // Set response header as JSON
    header('Content-Type: application/json');

    // Output the weather data as JSON
    echo json_encode($weather);
} else {
    // Return an error message as JSON
    echo json_encode(['error' => 'Error fetching data from the API.']);
}

// echo json_encode($data);

?>