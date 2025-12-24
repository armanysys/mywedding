/**
 * Script de verificación de arquitectura
 * Verifica que los endpoints retornen datos correctamente
 *
 * Uso: node scripts/verify-architecture.ts
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

interface TestResult {
  name: string
  endpoint: string
  status: "PASS" | "FAIL"
  message: string
  time: number
}

const results: TestResult[] = []

async function testEndpoint(name: string, endpoint: string): Promise<void> {
  const startTime = Date.now()
  try {
    const response = await fetch(`${API_URL}${endpoint}`)
    const time = Date.now() - startTime

    if (response.ok) {
      const data = await response.json()
      results.push({
        name,
        endpoint,
        status: "PASS",
        message: `✅ Retorna datos (${JSON.stringify(data).length} bytes)`,
        time,
      })
    } else {
      results.push({
        name,
        endpoint,
        status: "FAIL",
        message: `❌ Status ${response.status}`,
        time,
      })
    }
  } catch (error) {
    const time = Date.now() - startTime
    results.push({
      name,
      endpoint,
      status: "FAIL",
      message: `❌ Error: ${error instanceof Error ? error.message : "Unknown"}`,
      time,
    })
  }
}

async function main(): Promise<void> {
  console.log("\n🧪 Verificando Arquitectura por Capas\n")
  console.log(`URL Base: ${API_URL}\n`)
  console.log("Ejecutando tests...\n")

  // Crear promises de todos los tests
  const tests = [
    testEndpoint("Hero", "/api/hero"),
    testEndpoint("Couple Info", "/api/couple-info"),
    testEndpoint("Gift Registry", "/api/gift-registry"),
    testEndpoint("Event Details", "/api/event-details"),
    testEndpoint("Itinerary", "/api/itinerary"),
    testEndpoint("Logistics", "/api/logistics"),
    testEndpoint("Photo Gallery", "/api/photo-gallery"),
    testEndpoint("Confirmación Asistencia", "/api/confirmacion-asistencia"),
  ]

  // Esperar a todos los tests
  await Promise.all(tests)

  // Mostrar resultados
  console.log("📊 RESULTADOS:\n")
  console.log("┌─────────────────────────────┬──────────────────────────────────────────┬────────┐")
  console.log("│ Endpoint                    │ Estado                                   │ Tiempo │")
  console.log("├─────────────────────────────┼──────────────────────────────────────────┼────────┤")

  for (const result of results) {
    const name = result.name.padEnd(27)
    const message = result.message.padEnd(40)
    const time = `${result.time}ms`.padStart(6)
    console.log(`│ ${name} │ ${message} │ ${time} │`)
  }

  console.log("└─────────────────────────────┴──────────────────────────────────────────┴────────┘\n")

  // Resumen
  const passed = results.filter((r) => r.status === "PASS").length
  const failed = results.filter((r) => r.status === "FAIL").length
  const totalTime = results.reduce((sum, r) => sum + r.time, 0)

  console.log(`✅ Pasados: ${passed}/${results.length}`)
  console.log(`❌ Fallidos: ${failed}/${results.length}`)
  console.log(`⏱️  Tiempo total: ${totalTime}ms\n`)

  if (failed === 0) {
    console.log("🎉 ¡Todos los tests pasaron! La arquitectura está funcionando correctamente.\n")
    process.exit(0)
  } else {
    console.log("❌ Algunos tests fallaron. Verifica la consola de errores.\n")
    process.exit(1)
  }
}

main().catch((error) => {
  console.error("Error en verificación:", error)
  process.exit(1)
})
