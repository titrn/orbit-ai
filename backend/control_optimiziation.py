import math
from queue import PriorityQueue

def heuristic(a, b):
    """Calculate the heuristic (Euclidean distance) between two points."""
    return math.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2)

def a_star_search(start, goal, grid):
    """    if __name__ == "__main__":
        # Define a simple grid (0 = free, 1 = obstacle)
        grid = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]
    
        start = (0, 0)  # Starting point
        goal = (4, 4)  # Goal point
    
        path = a_star_search(start, goal, grid)
        print("Optimal Path:", path)
    Perform A* search to find the optimal path from start to goal on a grid.
    
    Args:
        start (tuple): Starting point (x, y).
        goal (tuple): Goal point (x, y).
        grid (list of list): 2D grid representing the environment (0 = free, 1 = obstacle).
    
    Returns:
        list: Optimal path as a list of (x, y) tuples.
    """
    rows, cols = len(grid), len(grid[0])
    open_set = PriorityQueue()
    open_set.put((0, start))
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}

    while not open_set.empty():
        _, current = open_set.get()

        if current == goal:
            # Reconstruct the path
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]  # Reverse the path

        x, y = current
        neighbors = [(x + dx, y + dy) for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]]

        for neighbor in neighbors:
            nx, ny = neighbor
            if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == 0:  # Check bounds and obstacles
                tentative_g_score = g_score[current] + 1  # Assume uniform cost for simplicity

                if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g_score
                    f_score[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                    open_set.put((f_score[neighbor], neighbor))


    return []  # Return an empty path if no solution is found