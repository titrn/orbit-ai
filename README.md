# Aerospace Mission Optimization Simulator

## Description

Developed a full-stack simulation tool to optimize satellite and drone missions, focusing on energy efficiency, trajectory planning, and payload utilization. Leveraged cutting-edge frameworks and technologies to integrate physics-based calculations, machine learning, cloud scalability, and a user-friendly interface.

## Key Features

1. **Physics-Based Simulation (Python)**:
    - Simulated orbital and aerodynamic forces (gravitational, drag, and thrust).
    - Modeled flight dynamics using **SciPy** and **NumPy** to calculate lift/drag coefficients for different materials and designs.
2. **Control Optimization (AI & Machine Learning)**:
    - Trained a path-planning algorithm using **TensorFlow** or **Scikit-learn** to minimize fuel consumption and maximize mission efficiency.
    - Implemented *A search* and **genetic algorithms** for route and mission optimization.
        - Minimizing fuel consumption
        - Maximizing payload efficiency
3. **Real-Time Visualization (React.js + Three.js)**:
    - Built an interactive 3D visualization of satellite/drone flight paths.
    - Enabled real-time updates of trajectory adjustments and mission data.
4. **User Input & Results (Node.js + Prisma)**:
    - Created a back-end API to handle simulation inputs (payload weight, distance, altitude).
    - Designed a React-based front-end for dynamic visualization of results: energy consumption, path efficiency, and system metrics.
    - Used **Prisma** to integrate a **PostgreSQL** database for storing and querying simulation scenarios.
5. **Cloud Integration (AWS Lambda + GCP)**:
    - Deployed resource-intensive calculations using **AWS Lambda** for scalability.
    - Stored simulation outputs in **S3** and backed them up in a NoSQL database (**MongoDB**).
6. **Real-World Weather API Integration**:
    - Integrated real-world weather data via the **OpenWeather API** to dynamically adjust trajectories based on conditions like wind, temperature, and pressure.

## Stretch Features

- **Multi-Agent Simulation**: Developed swarm behavior models for drone missions using **PyBullet** for physics and **PyTorch** for optimization.
- **CI/CD Deployment**: Automated testing and deployment pipelines using **GitHub Actions**.

## Impact

- Streamlined mission planning by reducing simulation runtime by **40%** using serverless architecture.
- Enhanced mission accuracy by incorporating real-world data, resulting in more reliable flight path predictions.