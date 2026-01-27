FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3.12 \
    python3-pip \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# resolving PEP 668 --break-system-packages
RUN pip3 install --no-cache-dir flake8 black mypy --break-system-packages

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt --break-system-packages

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]