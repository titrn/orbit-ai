from fastapi import FastAPI
from simulation import run_simulation
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Change "*" to specific origins later for security reasons
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
def simulate(thrust: float = 1000, mass: float = 500):
    print('hello /simulate main.py')
    result = run_simulation(thrust, mass)
    return {"status": "success", "data": result}

