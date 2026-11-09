
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://172.22.28.50:3000";

type Documento = {
  id: number;
  nombre: string;
  paginas: number;
  archivo: {
    id: number;
    nombre: string;
  };
};

const colores = ["#E8E1D2", "#DCE9DF", "#E8DDE0"];

export default function App() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  async function cargarDocumentos() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/documentos`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: Documento[] = await response.json();

      setDocumentos(data);
    } catch (err) {
      setError(
        "No se pudieron cargar los documentos. Comprueba NestJS y la conexión."
      );
      setDocumentos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void cargarDocumentos();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* CABECERA */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>ARCHIVO MUNICIPAL</Text>
            <Text style={styles.subtitle}>Gestión documental</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
        </View>

        {/* PRESENTACIÓN */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>
            Archivo Municipal
          </Text>

          <Text style={styles.welcomeText}>
            Consulta y gestiona los documentos históricos.
          </Text>
        </View>

        {/* DOCUMENTOS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Documentos</Text>

            <Text style={styles.sectionSubtitle}>
              {documentos.length} documentos disponibles
            </Text>
          </View>

          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {documentos.length}
            </Text>
          </View>
        </View>

        {/* CARGANDO */}
        {loading && (
          <View style={styles.message}>
            <ActivityIndicator size="large" color="#315C43" />
            <Text style={styles.messageText}>
              Cargando documentos...
            </Text>
          </View>
        )}

        {/* ERROR */}
        {!loading && error !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              onPress={() => void cargarDocumentos()}
              style={styles.retryButton}
            >
              <Text style={styles.retryText}>Reintentar</Text>
            </Pressable>
          </View>
        )}

        {/* LISTADO DESDE POSTGRESQL */}
        {!loading && !error && documentos.map((documento, index) => (
          <Pressable
            key={documento.id}
            onPress={() =>
              setSeleccionado(
                seleccionado === documento.id ? null : documento.id
              )
            }
            style={[
              styles.card,
              seleccionado === documento.id && styles.cardSelected,
            ]}
          >
            <View
              style={[
                styles.documentIcon,
                { backgroundColor: colores[index % colores.length] },
              ]}
            >
              <Text style={styles.documentIconText}>PDF</Text>
            </View>

            <View style={styles.documentInfo}>
              <Text style={styles.documentCategory}>
                {documento.archivo?.nombre?.toUpperCase() || "ARCHIVO"}
              </Text>

              <Text style={styles.documentTitle}>
                {documento.nombre}
              </Text>

              <Text style={styles.documentPages}>
                {documento.paginas} páginas
              </Text>
            </View>

            <Text style={styles.arrow}>
              {seleccionado === documento.id ? "⌄" : "›"}
            </Text>

            {seleccionado === documento.id && (
              <View style={styles.detail}>
                <Text style={styles.detailText}>
                  Documento ID: {documento.id}
                </Text>

                <Text style={styles.detailText}>
                  Archivo: {documento.archivo?.nombre}
                </Text>

                <Text style={styles.detailText}>
                  Total de páginas: {documento.paginas}
                </Text>
              </View>
            )}
          </Pressable>
        ))}

        {/* SIN DOCUMENTOS */}
        {!loading && !error && documentos.length === 0 && (
          <View style={styles.message}>
            <Text style={styles.messageText}>
              No hay documentos registrados.
            </Text>
          </View>
        )}

        {/* ACTUALIZAR */}
        {!loading && (
          <Pressable
            onPress={() => void cargarDocumentos()}
            style={styles.refreshButton}
          >
            <Text style={styles.refreshText}>
              Actualizar documentos
            </Text>
          </Pressable>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ARCHIVO MUNICIPAL · 2026
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5F6F3",
  },

  container: {
    padding: 24,
    paddingBottom: 40,
    maxWidth: 850,
    width: "100%",
    alignSelf: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 38,
  },

  logo: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#536B59",
  },

  subtitle: {
    fontSize: 12,
    color: "#89928A",
    marginTop: 5,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#254D3B",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  welcome: {
    marginBottom: 36,
  },

  welcomeTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#243D30",
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 15,
    color: "#78837B",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#263D31",
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#8A938C",
    marginTop: 5,
  },

  counter: {
    backgroundColor: "#E3EAE3",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  counterText: {
    color: "#315C43",
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#E9ECE8",
  },

  cardSelected: {
    borderColor: "#537C61",
  },

  documentIcon: {
    width: 52,
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  documentIconText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#536052",
  },

  documentInfo: {
    flex: 1,
  },

  documentCategory: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#829083",
    marginBottom: 6,
  },

  documentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#263D31",
  },

  documentPages: {
    fontSize: 13,
    color: "#89928A",
    marginTop: 7,
  },

  arrow: {
    fontSize: 26,
    color: "#829083",
    paddingLeft: 10,
  },

  detail: {
    width: "100%",
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#EDF0EC",
  },

  detailText: {
    fontSize: 13,
    color: "#536B59",
    marginBottom: 5,
  },

  message: {
    padding: 25,
    alignItems: "center",
    gap: 12,
  },

  messageText: {
    color: "#78837B",
    fontSize: 14,
  },

  errorBox: {
    backgroundColor: "#FCEAEA",
    padding: 18,
    borderRadius: 12,
    gap: 12,
  },

  errorText: {
    color: "#A13030",
  },

  retryButton: {
    backgroundColor: "#A13030",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  refreshButton: {
    backgroundColor: "#204E43",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  refreshText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  footer: {
    marginTop: 30,
    alignItems: "center",
  },

  footerText: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#A1AAA2",
  },
});
