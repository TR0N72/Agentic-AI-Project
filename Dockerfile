# Use an official Python runtime as a parent image
FROM python:3.11-slim-bookworm

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY req.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --timeout=600 -r req.txt

# Copy the rest of the application's code into the container at /app
COPY . .

# Command to run the application
CMD ["uvicorn", "api_main:app", "--host", "0.0.0.0", "--port", "8012"]
