To run this project's docker image, follow these steps:

Build the Docker image:
	docker build -t u17104361d1 .

Run the Docker container using the docker run command:
	docker run -p 80:80 u17104361d1

* Optional: Verify that Container is running:
	docker ps

Access the application by navigating to:
	http://localhost

Stop the Container:
	docker stop u17104361d1
