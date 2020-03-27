import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { FlatList, View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import logoimg from '../../assets/logo.png'
import styles from './styles'
import api from '../../services/api'


export default function Incidents() {
    const [insidents, setInsidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const navegation = useNavigation(false)

    function navegateToDetail(incident) {
        navegation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if (loading) {return}

        if (total > 0 && insidents.lenght === total) {return}
        
        setLoading(true) 


        const res = await api.get('incidents', {
                params : { page }
        })   


        setInsidents([...insidents, ...res.data])
        setTotal(res.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoimg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
            </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={insidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                decelerationRate={"fast"}
                renderItem={({ item }) => (
                    <View style={styles.incidentList}>
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG</Text>
                            <Text style={styles.incidentValue}>{item.name}</Text>

                            <Text style={styles.incidentProperty}>CASO</Text>
                            <Text style={styles.incidentValue}>{item.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR</Text>
                            <Text style={styles.incidentValue}>{
                                Intl.NumberFormat(
                                    'pt-BR',
                                    { style: 'currency', currency: 'BRL' }).format(item.value)}</Text>

                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={() => navegateToDetail(item)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#e02041" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}