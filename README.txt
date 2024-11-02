To run this project's docker image, follow these steps:

Build the Docker image:
	docker build --squash -t gravity .

Run the Docker container using the docker run command:
	docker run -p 3000:3000 --name gravity gravity

Save image:
	docker save -o gravity.tar gravity:latest

* Optional: Verify that Container is running:
	docker ps

Access the application by navigating to:
	http://localhost:3000

Stop the Container:
	docker stop gravity-final
