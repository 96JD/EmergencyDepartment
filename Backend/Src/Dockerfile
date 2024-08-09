FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /emergency-department

EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["EmergencyDepartment.csproj", "."]

RUN dotnet restore "./EmergencyDepartment.csproj"

COPY . .

WORKDIR "/src/."

RUN dotnet build "EmergencyDepartment.csproj" -c Release -o /emergency-department/build

FROM build AS publish

RUN dotnet publish "EmergencyDepartment.csproj" -c Release -o /emergency-department/publish /p:UseAppHost=false

FROM base AS final

WORKDIR /emergency-department

COPY --from=publish /emergency-department/publish .

ENTRYPOINT ["dotnet", "EmergencyDepartment.dll"]
