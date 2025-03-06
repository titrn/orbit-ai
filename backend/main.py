from fastapi import FastAPI
from simulation import run_simulation
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change "*" to specific origins later for security reasons
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# our app sending a GET request. home page, the default
@app.get("/")
def home():
    return {"message": "Hello, World! Welcome to OrbitAI"}

@app.post("/simulate")
# our app calling the /simulation API function
def simulate(thrust: float = 1000, mass: float = 1000, angle: float = 45, drag_coefficient: float = 0.5, area: float = 1.0, air_density: float = 1.225, wind_speed: float = 0.0):
    result = run_simulation(thrust, mass, angle, drag_coefficient, area, air_density, wind_speed)
    return {"status": "success", "data": result}

